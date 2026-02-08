import { useState, useEffect, useCallback } from "react";
import type { Cinema, CinemaStatus } from "../../model/Cinema";
// import type { CinemaStatus } from "../../model/Cinema";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Pagination from "../../UI/Pagination";
import { useNavigate } from "react-router-dom";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import "./cinema-management.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { adminCinemaService } from "../../../api/service/cinema.service";
import { CINEMA_STATUS } from "../../ENUM/CinemaStatus.enum";
import Loading from "../../UI/loading/Loading";

type StatusFilter = "ALL" | "AVAILABLE" | "FULL" | "CANCELLED" | "ENDED";
export default function CinemaManagement() {
  const navigate = useNavigate();
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();

  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  /* ===== FILTER ===== */
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const loadCinemas = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const data = await adminCinemaService.fetch({
        page,
        limit: size,
      });

      if (!data) return;

      setCinemas(data.items);
      console.log("Fetched Cinema:", data.items);
      setTotalItems(data.totalItems);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thay đổi useEffect
  useEffect(() => {
    loadCinemas(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, loadCinemas]); // Thêm dependencies

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  /* ================= CRUD ================= */
  const handleDelete = (id: number) => {
    confirm(
      "Bạn có chắc chắn muốn xóa rạp phim này?",
      () => {
        setCinemas((prev) => prev.filter((a) => a.id !== id));
        try {
          adminCinemaService.delete(id);
          // loadActors();
          message.success("Xóa rạp phim thành công");
        } catch (err: any) {
          console.log(err.message);
          message.error("Xóa rạp phim thất bại: ");
        }
      },
      {
        type: "danger",
        title: "Xóa rạp phim",
        confirmText: "Xóa",
        cancelText: "Hủy",
      },
    );
  };

  const handleUpdate = (id: number) => {
    // alert("Update showtime id = " + id);
    message.info(`Đang mở form sửa user #${id}`);
  };

  /* ================= RENDER ================= */
  return (
    <div className="cinema-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          // { label: "Quản lý phim", path: "/admin/movies" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Quản Lý rạp phim" },
        ]}
        action={
          <button
            className="btn-add"
            onClick={() => navigate("/admin/cinema/add-cinema")}
          >
            + Thêm Rạp phim
          </button>
        }
      />

      {/* ===== FILTER ===== */}
      <div className="filters">
        <input
          placeholder="Tìm theo thành phố..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value={CINEMA_STATUS.ACTIVE}>Hoạt động</option>
          <option value={CINEMA_STATUS.INACTIVE}>Ngưng hoạt động</option>
          <option value={CINEMA_STATUS.MAINTENANCE}>Bảo trì</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <div className="cinema-table">
        {loading ? (
          // <p>Loading...</p>
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>MÃ</th>
                <th>Tên rạp</th>
                <th>Địa chỉ</th>
                <th>Thành phố</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {cinemas.map((c) => (
                <tr key={c.id}>
                  <td>{c.code}</td>
                  <td className="name">{c.name}</td>
                  <td>
                    {c.address}, {c.ward}, {c.district}
                  </td>
                  <td>{c.city}</td>
                  <td>
                    <span className={`status ${c.status}`}>
                      {c.status === CINEMA_STATUS.ACTIVE
                        ? "Hoạt động"
                        : c.status === CINEMA_STATUS.INACTIVE
                          ? "Ngưng"
                          : "Bảo trì"}
                    </span>
                  </td>

                  <td className="actions">
                    <TooltipIconButton
                      title="Update"
                      onClick={() => handleUpdate(c.id!)}
                      size={50}
                      color="#696969"
                    >
                      <BorderColorIcon width={20} height={20} />
                    </TooltipIconButton>

                    <TooltipIconButton
                      title="Delete"
                      onClick={() => handleDelete(c.id!)}
                      size={50}
                      color="#c52929ff"
                    >
                      <DeleteIcon width={20} height={20} />
                    </TooltipIconButton>
                  </td>
                </tr>
              ))}

              {cinemas.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty">
                    Không có rạp nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== PAGINATION ===== */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[10, 25, 50, 100]}
        maxVisible={3}
      />
    </div>
  );
}
