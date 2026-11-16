import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";
import { Edit, BarChart2 } from "lucide-react";

import PageHeader from "../../../UI/PageHearder/PageHeader";
import { MessageContainer, useMessage } from "../../../UI/Message/Message";
import Loading from "../../../UI/loading/Loading";
import { ROUTES } from "../../../../constants/routes";
import { adminHallService } from "../../../../api/service/hall.service";
import { adminCinemaService } from "../../../../api/service/cinema.service";
import { Cinema } from "../../../model/Cinema";
import "./scss/add-hall.scss";

type HallType = "STANDARD" | "VIP" | "IMAX" | "FOUR_DX";

const AddHall: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const message = useMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  const [form, setForm] = useState({
    cinemaId: "" as (number | ""),
    name: "",
    hallType: "STANDARD" as HallType,
    totalRows: 10,
    seatsPerRow: 10,
    file: null as File | null,
  });

  // Load Cinemas
  useEffect(() => {
    const loadData = async () => {
       try {
          const res = await adminCinemaService.fetch({ page: 1, limit: 100 });
          setCinemas(res?.items || []);
       } catch (err) {
          console.error("Lỗi tải rạp:", err);
       }
    };
    loadData();
  }, []);

  // Fetch hall data if edit
  useEffect(() => {
    if (isEdit && id) {
      const fetchHall = async () => {
        setLoading(true);
        try {
          const data = await adminHallService.getById(Number(id));
          setForm({
            cinemaId: data.cinemaId,
            name: data.name,
            hallType: data.hallType as HallType,
            totalRows: data.totalRows,
            seatsPerRow: data.seatsPerRow,
            file: null,
          });
        } catch (err) {
          message.error("Không thể tải thông tin phòng chiếu!");
        } finally {
          setLoading(false);
        }
      };
      fetchHall();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: (name === "cinemaId" || name === "totalRows" || name === "seatsPerRow") 
        ? (value === "" ? "" : Number(value)) 
        : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, file }));
      
      // Auto-read Excel to determine dimensions
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          
          // Get range (A1:Z20 etc)
          const range = XLSX.utils.decode_range(firstSheet['!ref'] || 'A1:A1');
          
          // Total Rows = end Row - start Row + 1
          const totalRows = range.e.r - range.s.r + 1;
          // Seats Per Row = end Col - start Col + 1
          const seatsPerRow = range.e.c - range.s.c + 1;

          if (totalRows > 0 && seatsPerRow > 0) {
            setForm(prev => ({
              ...prev,
              totalRows,
              seatsPerRow
            }));
            message.info(`Tự động nhận diện: ${totalRows} hàng x ${seatsPerRow} ghế/hàng`);
          }
        } catch (err) {
          console.error("Lỗi đọc Excel:", err);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cinemaId || !form.name) {
      message.error("Vui lòng nhập tên và chọn rạp!");
      return;
    }
    if (!isEdit && !form.file) {
      message.error("Vui lòng tải lên file sơ đồ ghế!");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("cinemaId", String(form.cinemaId));
      formData.append("name", form.name);
      formData.append("hallType", form.hallType);
      formData.append("totalRows", String(form.totalRows));
      formData.append("seatsPerRow", String(form.seatsPerRow));
      if (form.file) formData.append("file", form.file);

      if (isEdit) {
        await adminHallService.updateWithFile(Number(id), formData);
        message.success("Cập nhật phòng chiếu thành công!");
      } else {
        await adminHallService.createWithFile(formData);
        message.success("Tạo phòng chiếu mới thành công!");
      }
      
      setTimeout(() => {
        navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.HALLS}`);
      }, 1000);
    } catch (err: any) {
      message.error("Lỗi: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-hall-page">
      <MessageContainer messages={message.messages} onRemove={message.removeMessage} />
      {loading && <Loading text="Đang tải thông tin..." />}
      {isSubmitting && <Loading text="Đang xử lý..." />}

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.DASHBOARD}` },
          { label: "Quản lý phòng chiếu", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.HALLS}` },
          { label: isEdit ? `Cập nhật: ${form.name || ''}` : "Khởi tạo phòng chiếu" },
        ]}
      />

      <div className="hall-form-container-premium">
         <div className="hall-form-card shadow-lg">
            <div className="card-header">
               <div className="icon-badge">{isEdit ? <Edit size={20} /> : <BarChart2 size={20} />}</div>
               <h3>{isEdit ? "Cấu hình lại phòng chiếu" : "Tạo sơ đồ từ Excel"}</h3>
            </div>

            <form className="hall-form-v2" onSubmit={handleSubmit}>
               <div className="form-group-modern">
                  <label>Thuộc cụm rạp phim *</label>
                  <select name="cinemaId" value={form.cinemaId} onChange={handleChange} required>
                    <option value="">Chọn rạp để gán phòng chiếu...</option>
                    {cinemas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
               </div>

               <div className="form-group-modern">
                  <label>Tên phòng chiếu *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Nhập tên phòng..." 
                    required 
                  />
               </div>

               <div className="form-row-modern">
                  <div className="form-group-modern flex-1">
                    <label>Loại rạp *</label>
                    <select name="hallType" value={form.hallType} onChange={handleChange}>
                       <option value="STANDARD">STANDARD</option>
                       <option value="VIP">VIP Gold</option>
                       <option value="IMAX">IMAX</option>
                       <option value="FOUR_DX">4DX</option>
                    </select>
                  </div>
                  <div className="form-group-modern flex-1">
                    <label>Tổng hàng</label>
                    <input type="number" name="totalRows" value={form.totalRows} onChange={handleChange} min={1} required />
                  </div>
                  <div className="form-group-modern flex-1">
                    <label>Hàng mỗi cột</label>
                    <input type="number" name="seatsPerRow" value={form.seatsPerRow} onChange={handleChange} min={1} required />
                  </div>
               </div>

               <div className="form-group-modern">
                  <label>Tải lên Sơ đồ ghế (Excel .xlsx, .xls) *</label>
                  <div 
                    className={`file-upload-zone ${form.file ? 'has-file' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                     <CloudUploadIcon className="up-icon" />
                     <div className="texts">
                        {form.file ? (
                          <span className="file-name">{form.file.name}</span>
                        ) : (
                          <>
                            <span className="big-text">Kéo thả hoặc nhấn để chọn file Excel</span>
                            <span className="small-text">Hỗ trợ định dạng .xlsx, .xls</span>
                          </>
                        )}
                     </div>
                     <input 
                       type="file" 
                       ref={fileInputRef} 
                       onChange={handleFileChange} 
                       accept=".xlsx, .xls" 
                       style={{ display: 'none' }} 
                     />
                  </div>
               </div>

               <div className="form-actions-premium">
                  <button type="button" className="btn-back-flat" onClick={() => navigate(-1)}>Quay lại</button>
                  <button type="submit" className="btn-submit-glow" disabled={isSubmitting}>
                     {isSubmitting ? "Đang xử lý..." : (isEdit ? "Cập nhật" : "Tạo mới")}
                  </button>
               </div>
            </form>
         </div>
      </div>
    </div>
  );
};

export default AddHall;
