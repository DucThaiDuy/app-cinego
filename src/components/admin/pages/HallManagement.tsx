import React, { useState, useEffect, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Pagination from "../../UI/Pagination";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import Loading from "../../UI/loading/Loading";
import "./HallManagement.scss";

import { adminHallService } from "../../../api/service/hall.service";
import { adminCinemaService } from "../../../api/service/cinema.service";
import { HallResponse } from "../../../api/types/response/HallResponse";
import { Cinema } from "../../model/Cinema";

export default function HallManagement() {
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();

  const [halls, setHalls] = useState<HallResponse[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Filters
  const [cinemaFilter, setCinemaFilter] = useState<number | "">("");
  const [nameFilter, setNameFilter] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form State
  const [formCinemaId, setFormCinemaId] = useState<number | "">("");
  const [formName, setFormName] = useState("");
  const [formHallType, setFormHallType] = useState<"STANDARD" | "VIP" | "IMAX" | "FOUR_DX">("STANDARD");
  const [formTotalRows, setFormTotalRows] = useState(10);
  const [formSeatsPerRow, setFormSeatsPerRow] = useState(10);
  const [formFile, setFormFile] = useState<File | null>(null);

  // Load Dependencies (Cinemas)
  useEffect(() => {
    adminCinemaService.fetch({ page: 1, limit: 100 })
      .then(res => setCinemas(res?.items || []))
      .catch(err => console.error("Lỗi tải rạp:", err));
  }, []);

  // Load Halls
  const loadHalls = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminHallService.fetchHalls(
        { page: currentPage, limit: itemsPerPage },
        { 
            cinemaId: cinemaFilter !== "" ? Number(cinemaFilter) : undefined, 
            name: nameFilter 
        }
      );
      setHalls(data?.items || []);
      setTotalItems(data?.totalItems || 0);
    } catch (err: any) {
      console.error(err);
      message.error("Lỗi khi tải danh sách phòng chiếu");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, cinemaFilter, nameFilter]);

  useEffect(() => {
    loadHalls();
  }, [loadHalls]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cinemaFilter, nameFilter]);

  // Handle Delete
  const handleDelete = (id: number) => {
    confirm("Bạn có chắc chắn muốn xóa phòng chiếu này?", async () => {
      try {
        await adminHallService.deleteHall(id);
        message.success("Xóa phòng chiếu thành công");
        loadHalls();
      } catch (err) {
        message.error("Xóa thất bại!");
      }
    }, { type: "danger", title: "Xóa phòng chiếu", confirmText: "Xóa", cancelText: "Hủy" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormCinemaId(cinemas.length > 0 ? cinemas[0].id || "" : "");
    setFormName("");
    setFormHallType("STANDARD");
    setFormTotalRows(10);
    setFormSeatsPerRow(10);
    setFormFile(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleUpdate = (hall: HallResponse) => {
    setEditId(hall.id);
    setFormCinemaId(hall.cinemaId);
    setFormName(hall.name);
    setFormHallType(hall.hallType);
    setFormTotalRows(hall.totalRows);
    setFormSeatsPerRow(hall.seatsPerRow);
    setFormFile(null); // Require re-upload file for update currently based on API
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCinemaId || !formName || !formFile) {
      message.error("Vui lòng nhập tên, chọn rạp và file sơ đồ ghế!");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("cinemaId", String(formCinemaId));
      formData.append("name", formName);
      formData.append("hallType", formHallType);
      formData.append("totalRows", String(formTotalRows));
      formData.append("seatsPerRow", String(formSeatsPerRow));
      formData.append("file", formFile);

      if (editId) {
        await adminHallService.updateWithFile(editId, formData);
        message.success("Cập nhật phòng chiếu thành công!");
      } else {
        await adminHallService.createWithFile(formData);
        message.success("Thêm mới phòng chiếu thành công!");
      }
      setIsModalOpen(false);
      loadHalls();
    } catch (err: any) {
      console.error(err);
      message.error("Lỗi lưu phòng chiếu: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hall-page cinema-page">
      <MessageContainer messages={message.messages} onRemove={message.removeMessage} />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Rạp phim", path: "/admin/cinemas" },
          { label: "Quản Lý phòng chiếu (Halls)" },
        ]}
        action={
          <button className="btn-add" onClick={openAddModal}>
            + Thêm Phòng chiếu mới
          </button>
        }
      />

      {/* FILTER */}
      <div className="filters">
        <select value={cinemaFilter} onChange={(e) => setCinemaFilter(e.target.value ? Number(e.target.value) : "")}>
          <option value="">-- Tất cả rạp (Cinemas) --</option>
          {cinemas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input
          placeholder="Tìm theo tên phòng..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="hall-table cinema-table">
        {loading ? <Loading /> : (
          <table>
            <thead>
              <tr>
                <th>MÃ</th>
                <th>Tên Rạp</th>
                <th>Phòng (Hall Name)</th>
                <th>Loại</th>
                <th>Sức chứa</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{cinemas.find(c => c.id === h.cinemaId)?.name || h.cinemaName || "CINE-" + h.cinemaId}</td>
                  <td className="name">{h.name}</td>
                  <td><b>{h.hallType}</b></td>
                  <td>{h.totalSeats} ghế ({h.totalRows}x{h.seatsPerRow})</td>
                  <td>
                    <span className={`status ${h.status}`}>
                      {h.status === "ACTIVE" ? "Hoạt động" : h.status === "INACTIVE" ? "Ngưng" : "Bảo trì"}
                    </span>
                  </td>
                  <td className="actions">
                    <TooltipIconButton title="Update" onClick={() => handleUpdate(h)} size={40} color="#696969">
                      <BorderColorIcon width={20} height={20} />
                    </TooltipIconButton>
                    <TooltipIconButton title="Delete" onClick={() => handleDelete(h.id)} size={40} color="#c52929ff">
                      <DeleteIcon width={20} height={20} />
                    </TooltipIconButton>
                  </td>
                </tr>
              ))}
              {halls.length === 0 && <tr><td colSpan={7} className="empty">Không có phòng chiếu nào</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => { setItemsPerPage(limit); setCurrentPage(1); }}
        itemsPerPageOptions={[10, 25, 50]}
        maxVisible={3}
      />

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="hall-modal-overlay">
          <div className="hall-modal">
            <h2>{editId ? "Sửa Phòng Chiếu" : "Tạo Mới Phòng Chiếu"}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Thuộc Rạp (Cinema) *</label>
                <select value={formCinemaId} onChange={e => setFormCinemaId(Number(e.target.value))} required>
                  <option value="">-- Chọn rạp --</option>
                  {cinemas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Tên phòng (vd: RAP 1) *</label>
                <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Loại phòng chiếu *</label>
                <select value={formHallType} onChange={e => setFormHallType(e.target.value as any)}>
                  <option value="STANDARD">STANDARD (Tiêu chuẩn)</option>
                  <option value="VIP">VIP</option>
                  <option value="IMAX">IMAX</option>
                  <option value="FOUR_DX">4DX</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số hàng ghế *</label>
                  <input type="number" min="1" required value={formTotalRows} onChange={e => setFormTotalRows(Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label>Số ghế mỗi hàng *</label>
                  <input type="number" min="1" required value={formSeatsPerRow} onChange={e => setFormSeatsPerRow(Number(e.target.value))} />
                </div>
              </div>

              <div className="form-group">
                <label>File sơ đồ ghế (Seat Layout) *</label>
                <input 
                  type="file" 
                  accept=".json,.xlsx,.csv" 
                  required={!editId} 
                  onChange={e => setFormFile(e.target.files ? e.target.files[0] : null)} 
                />
                {editId && <small style={{ color: "#f44336" }}>Lưu ý: Bạn bắt buộc phải chọn lại file sơ đồ ghế khi cập nhật.</small>}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang lưu..." : (editId ? "Cập nhật" : "Tạo phòng chiếu")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
