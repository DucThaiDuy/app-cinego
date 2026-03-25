// BookingPage.tsx
import React, { useCallback, useEffect, useState } from "react";
// import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Pagination from "../../UI/Pagination";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import "./BookingPage.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { BookingResponse } from "../../../api/types/response/BookingResponse";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { BookingStatus } from "../../ENUM/BookingStatus.enum";
import { PaymentMethod } from "../../ENUM/PaymentMethod.enum";
import { adminBookingService } from "../../../api/service/booking.service";
import Loading from "../../UI/loading/Loading";

// ===== COMPONENT =====
export default function BookingPage() {
  const navigate = useNavigate();
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  /* ===== FILTER ===== */
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<BookingStatus | null>(null);

  const loadBooking = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const data = await adminBookingService.fetchUsers({
        page,
        limit: size,
      });

      if (!data) return;

      setBookings(data.items);
      console.log("Fetched showtimes:", data.items);
      setTotalItems(data.totalItems);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thay đổi useEffect
  useEffect(() => {
    loadBooking(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, loadBooking]); // Thêm dependencies

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, paymentFilter, statusFilter]);

  // Checkin
  const handleCheckin = (id: number) => {
    // chuyển hướng đến trang checkin auto với id tùy chọn
    navigate(
      `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`
    );
    message.info(`Đang chuyển đến Checkin Auto #${id}`);
  };

  const handleDelete = (id: number) => {
    confirm(
      "Bạn có chắc chắn muốn xóa diễn viên này?",
      () => {
        setBookings((prev) => prev.filter((a) => a.id !== id));
        try {
          adminBookingService.deleteUser(id);
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

  const handleEdit = (id: number) => {
    // alert("Edit booking " + id);
    message.info(`Đang mở form sửa user #${id}`);
  };

  return (
    <div className="booking-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />

      {/* <div className="showtime-page__header">
        <h2>Quản lý Booking</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/admin/bookings/auto-checkin")}
        >
          <QrCodeIcon /> Checkin Auto
        </button>
      </div> */}

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          // { label: "Quản lý phim", path: "/admin/movies" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Quản lý Đặt vé" },
        ]}
        action={
          <button
            className="btn-add"
            onClick={() =>
              // use ROUTES constants to build correct full path including prefix
              navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`)
            }
          >
            <QrCodeIcon /> Checkin Auto
          </button>
        }
      />
      {/* <h1>Quản lý Booking</h1> */}

      <div className="filter-bar">
        <input
          placeholder="Tìm kiếm theo tên khách hoặc mã booking"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter ?? ""}
          onChange={(e) =>
            setStatusFilter(
              e.target.value ? (e.target.value as BookingStatus) : null,
            )
          }
        >
          <option value="">Tất cả trạng thái</option>

          {Object.values(BookingStatus).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        {loading ? (
          // <p>Loading...</p>
          <Loading />
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Mã Booking</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Vé/Combo</th>
                <th>Giảm giá</th>
                <th>Điểm dùng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.bookingCode}</td>
                  <td>{b.customerName}</td>
                  <td>{b.customerEmail}</td>
                  <td>{b.customerPhone}</td>
                  <td>
                    {(b.ticketPrice + b.comboPrice).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>

                  <td>
                    {b.discountAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{b.pointsUsed}</td>
                  <td>
                    {b.totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className={`status ${b.status}`}>{b.status}</td>
                  <td>{b.paymentMethod}</td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td className="actions">
                    {/* <button className="edit" onClick={() => handleEdit(b.id)}>
                    <FaEdit />
                  </button> */}
                    <TooltipIconButton
                      title="Update"
                      onClick={() => handleEdit(b.id)}
                      size={50}
                      color="#696969"
                    >
                      <BorderColorIcon width={20} height={20} />
                    </TooltipIconButton>
                    {/* <button className="delete" onClick={() => handleDelete(b.id)}>
                    <FaTrash />
                  </button> */}
                    <TooltipIconButton
                      title="Delete"
                      onClick={() => handleDelete(b.id)}
                      size={50}
                      color="#c52929ff" // icon đỏ
                    >
                      <DeleteIcon width={20} height={20} />
                    </TooltipIconButton>
                    {b.status !== BookingStatus.USED && (
                      // <button
                      //   className="checkin"
                      //   onClick={() => handleCheckin(b.id)}
                      // >
                      //   <FaCheck />
                      // </button>
                      <TooltipIconButton
                        title="Checkin"
                        onClick={() => handleCheckin(b.id)}
                        size={50}
                        color="#000000ff" // icon đỏ
                      >
                        <QrCodeIcon width={20} height={20} />
                      </TooltipIconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1); // reset về trang 1 khi đổi số item/trang
        }}
        itemsPerPageOptions={[10, 25, 50, 100]}
        maxVisible={2}
      />
    </div>
  );
}
