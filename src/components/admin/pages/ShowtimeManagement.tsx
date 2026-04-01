import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import Pagination from "../../UI/Pagination";
import { useNavigate } from "react-router-dom";
import "./showtime.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { Showtime } from "../../../api/types/model/Showtime.model";
import { adminShowTimeService } from "../../../api/service/showTime.service";
import { ShowTimeResponse } from "../../../api/types/response/ShowTimeResponse";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { MessageContainer, useMessage } from "../../UI/Message/Message";

type StatusFilter = "ALL" | "AVAILABLE" | "FULL" | "CANCELLED" | "ENDED";
type LanguageFilter = "ALL" | "SUBTITLE" | "DUBBED";
type FormatFilter = "ALL" | "STANDARD" | "VIP" | "IMAX" | "FOUR_DX";
export default function ShowtimeManagement() {
  const navigate = useNavigate();
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();
  const [showtimes, setShowtimes] = useState<ShowTimeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  /* ===== FILTER ===== */
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<LanguageFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("ALL");

  const loadShowTimes = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const data = await adminShowTimeService.fetchUsers({
        page,
        limit: size,
      });

      if (!data) return;

      setShowtimes(data.items);
      console.log("Fetched showtimes:", data.items);
      setTotalItems(data.totalItems);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency vì không phụ thuộc state/props nào

  // Thay đổi useEffect
  useEffect(() => {
    loadShowTimes(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, loadShowTimes]); // Thêm dependencies

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, ageFilter, statusFilter]);

  /* ===== CRUD ===== */
  const handleDelete = (id: number) => {
    confirm(
      "Bạn có chắc chắn muốn xóa diễn viên này?",
      () => {
        setShowtimes((prev) => prev.filter((a) => a.id !== id));
        try {
          adminShowTimeService.deleteUser(id);
          // loadActors();
          message.success("Xóa diễn viên thành công");
        } catch (err: any) {
          console.log(err.message);
          message.error("Xóa diễn viên thất bại: ");
        }
      },
      {
        type: "danger",
        title: "Xóa diễn viên",
        confirmText: "Xóa",
        cancelText: "Hủy",
      },
    );
  };

  const handleUpdate = (id: number) => {
    // alert("Update showtime id = " + id);
    message.info(`Đang mở form sửa user #${id}`);
  };

  return (
    <div className="showtime-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim", path: "/admin/movies" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Lịch chiếu" },
        ]}
        action={
          <button
            className="btn-add"
            onClick={() => navigate("/admin/showtime/add-showtime")}
          >
            + Thêm lịch chiếu
          </button>
        }
      />

      {/* FILTER */}
      <div className="showtime-filter">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Tìm theo tên phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="AVAILABLE">Còn vé</option>
          <option value="FULL">Hết vé</option>
          <option value="CANCELLED">Hủy</option>
          <option value="ENDED">Đã chiếu</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="showtime-table-wrapper">
        <table className="showtime-table">
          <thead>
            <tr>
              <th>Phim</th>
              <th>Rạp</th>
              <th>Phòng</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Định dạng</th>
              <th>Ngôn ngữ</th>
              <th>Ghế trống</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((s) => (
              <tr key={s.id}>
                <td className="movie">
                  <img src={s.posterUrl} alt={s.movie_title} />
                  {/* {s.posterUrl} */}
                  <span className="movie-title">{s.movie_title}</span>
                </td>
                <td>{s.cinema_name}</td>
                <td>{s.hall_name}</td>
                <td>{s.date}</td>
                <td>{s.time}</td>
                <td className="format">{s.format}</td>
                <td>{s.language === "subtitle" ? "Phụ đề" : "Lồng tiếng"}</td>
                <td>{s.available_seats}</td>
                <td>
                  <span className={`status ${s.status}`}>{s.status}</span>
                </td>
                <td className="actions">
                  <TooltipIconButton
                    title="Xóa"
                    onClick={() => handleDelete(s.id)}
                    size={38}
                    color="#c52929"
                  >
                    <DeleteIcon />
                  </TooltipIconButton>

                  <TooltipIconButton
                    title="Cập nhật"
                    onClick={() => handleUpdate(s.id)}
                    size={38}
                    color="#555"
                  >
                    <BorderColorIcon />
                  </TooltipIconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
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
        maxVisible={2}
      />
    </div>
  );
}
