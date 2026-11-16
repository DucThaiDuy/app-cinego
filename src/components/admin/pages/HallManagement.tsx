import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import BusinessIcon from "@mui/icons-material/Business";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import Pagination from "../../UI/Pagination";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import Loading from "../../UI/loading/Loading";
import { ROUTES } from "../../../constants/routes";
import "./HallManagement.scss";

import { adminHallService } from "../../../api/service/hall.service";
import { adminCinemaService } from "../../../api/service/cinema.service";
import { HallResponse } from "../../../api/types/response/HallResponse";
import { Cinema } from "../../model/Cinema";

export default function HallManagement() {
  const navigate = useNavigate();
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();

  // Data States
  const [halls, setHalls] = useState<HallResponse[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Filters
  const [cinemaFilter, setCinemaFilter] = useState<number | "">("");
  const [nameFilter, setNameFilter] = useState("");

  // Load Cinema List for Dropdowns
  useEffect(() => {
    adminCinemaService.fetch({ page: 1, limit: 100 })
      .then(res => setCinemas(res?.items || []))
      .catch(err => console.error("Lỗi tải rạp:", err));
  }, []);

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

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [cinemaFilter, nameFilter]);

  const handleDelete = (id: number) => {
    confirm("Bạn có chắc chắn muốn xóa phòng chiếu này? Mọi lịch chiếu liên quan sẽ bị ảnh hưởng.", async () => {
      try {
        await adminHallService.deleteHall(id);
        message.success("Xóa phòng chiếu thành công!");
        loadHalls();
      } catch (err) {
        message.error("Xóa thất bại! Vui lòng thử lại.");
      }
    }, { type: "danger", title: "Xóa phòng chiếu", confirmText: "Xóa ngay", cancelText: "Hủy" });
  };

  const handleAdd = () => {
     navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_HALL}`);
  };

  const handleEdit = (hall: HallResponse) => {
     navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.EDIT_HALL.replace(":id", hall.id.toString())}`);
  };

  const getHallTypeBadge = (type: string) => {
    const types: any = {
      STANDARD: { label: "Standard", class: "standard" },
      VIP: { label: "VIP Gold", class: "vip" },
      IMAX: { label: "IMAX Laser", class: "imax" },
      FOUR_DX: { label: "4DX Dynamic", class: "four-dx" },
    };
    const t = types[type] || { label: type, class: "default" };
    return <span className={`hall-type-badge ${t.class}`}>{t.label}</span>;
  };

  return (
    <div className="hall-mgmt-container">
      <MessageContainer messages={message.messages} onRemove={message.removeMessage} />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.DASHBOARD}` },
          { label: "Quản lý Phòng chiếu" },
        ]}
        action={
          <button className="btn-create-hall" onClick={handleAdd}>
            <span className="plus-icon">+</span> Thêm phòng chiếu
          </button>
        }
      />

      {/* FILTER PANEL */}
      <div className="hall-filter-panel shadow-premium">
        <div className="filter-group">
          <label><BusinessIcon /> Chọn Rạp</label>
          <select value={cinemaFilter} onChange={e => setCinemaFilter(e.target.value ? Number(e.target.value) : "")}>
            <option value="">Tất cả cụm rạp</option>
            {cinemas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="filter-group search-group">
          <label><FilterListIcon /> Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tên phòng, mã phòng..."
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      {/* HALL LIST */}
      <div className="hall-grid-layout">
        {loading ? (
          <div className="loading-full"><Loading text="Đang đồng bộ dữ liệu..." /></div>
        ) : (
          <div className="hall-table-wrapper shadow-premium">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phòng Chiếu</th>
                  <th>Cụm Rạp</th>
                  <th>Loại Phòng</th>
                  <th>Sơ Đồ Ghế</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {halls.map((hall) => (
                  <tr key={hall.id}>
                    <td className="id-cell">#{hall.id}</td>
                    <td className="name-cell">
                       <ViewModuleIcon /> <strong>{hall.name}</strong>
                    </td>
                    <td className="cinema-cell">
                       {cinemas.find(c => c.id === hall.cinemaId)?.name || hall.cinemaName || "CineGo Cinema"}
                    </td>
                    <td>{getHallTypeBadge(hall.hallType)}</td>
                    <td className="capacity-cell">
                        <div className="seat-summary">
                           <span className="total">{hall.totalSeats} ghế</span>
                           <span className="layout">{hall.totalRows} hàng x {hall.seatsPerRow} cột</span>
                        </div>
                    </td>
                    <td>
                      <span className={`status-pill ${hall.status?.toLowerCase() || 'active'}`}>
                        {hall.status === "ACTIVE" ? "Hoạt động" : hall.status === "INACTIVE"?"Tạm ngưng":"Bảo trì"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <TooltipIconButton title="Chỉnh sửa" onClick={() => handleEdit(hall)} color="#4f46e5">
                        <EditIcon fontSize="small" />
                      </TooltipIconButton>
                      <TooltipIconButton title="Xóa" onClick={() => handleDelete(hall.id)} color="#ef4444">
                        <DeleteIcon fontSize="small" />
                      </TooltipIconButton>
                    </td>
                  </tr>
                ))}
                {halls.length === 0 && (
                  <tr>
                    <td colSpan={7} className="no-data">
                       Không tìm thấy kết quả phù hợp!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="hall-pagination-box">
         <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            itemsPerPageOptions={[10, 20, 50]}
         />
      </div>
    </div>
  );
}
