import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// BookingPage.tsx
import { useCallback, useEffect, useState } from "react";
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
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { BookingStatus } from "../../ENUM/BookingStatus.enum";
import { adminBookingService } from "../../../api/service/booking.service";
import Loading from "../../UI/loading/Loading";
// ===== COMPONENT =====
export default function BookingPage() {
    const navigate = useNavigate();
    const message = useMessage();
    const { confirms, confirm, removeConfirm } = useConfirm();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    /* ===== FILTER ===== */
    const [searchTerm, setSearchTerm] = useState("");
    const [paymentFilter, setPaymentFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const loadBooking = useCallback(async (page, size) => {
        setLoading(true);
        try {
            const data = await adminBookingService.fetchUsers({
                page,
                limit: size,
            });
            if (!data)
                return;
            setBookings(data.items);
            console.log("Fetched showtimes:", data.items);
            setTotalItems(data.totalItems);
        }
        catch (err) {
            console.error(err.message);
        }
        finally {
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
    const handleCheckin = (id) => {
        // chuyển hướng đến trang checkin auto với id tùy chọn
        navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`);
        message.info(`Đang chuyển đến Checkin Auto #${id}`);
    };
    const handleDelete = (id) => {
        confirm("Bạn có chắc chắn muốn xóa diễn viên này?", () => {
            setBookings((prev) => prev.filter((a) => a.id !== id));
            try {
                adminBookingService.deleteUser(id);
                // loadActors();
                message.success("Xóa diễn viên thành công");
            }
            catch (err) {
                console.log(err.message);
                message.error("Xóa diễn viên thất bại: ");
            }
        }, {
            type: "danger",
            title: "Xóa diễn viên",
            confirmText: "Xóa",
            cancelText: "Hủy",
        });
    };
    const handleEdit = (id) => {
        // alert("Edit booking " + id);
        message.info(`Đang mở form sửa user #${id}`);
    };
    return (_jsxs("div", { className: "booking-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(ConfirmContainer, { confirms: confirms, onRemove: removeConfirm }), _jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    // { label: "Quản lý phim", path: "/admin/movies" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Quản lý Đặt vé" },
                ], action: _jsxs("button", { className: "btn-add", onClick: () => 
                    // use ROUTES constants to build correct full path including prefix
                    navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`), children: [_jsx(QrCodeIcon, {}), " Checkin Auto"] }) }), _jsxs("div", { className: "filter-bar", children: [_jsx("input", { placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn kh\u00E1ch ho\u1EB7c m\u00E3 booking", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { value: statusFilter ?? "", onChange: (e) => setStatusFilter(e.target.value ? e.target.value : null), children: [_jsx("option", { value: "", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), Object.values(BookingStatus).map((s) => (_jsx("option", { value: s, children: s }, s)))] })] }), _jsx("div", { className: "table-container", children: loading ? (
                // <p>Loading...</p>
                _jsx(Loading, {})) : (_jsxs("table", { className: "booking-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "M\u00E3 Booking" }), _jsx("th", { children: "Kh\u00E1ch h\u00E0ng" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "\u0110i\u1EC7n tho\u1EA1i" }), _jsx("th", { children: "V\u00E9/Combo" }), _jsx("th", { children: "Gi\u1EA3m gi\u00E1" }), _jsx("th", { children: "\u0110i\u1EC3m d\u00F9ng" }), _jsx("th", { children: "T\u1ED5ng ti\u1EC1n" }), _jsx("th", { children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { children: "Thanh to\u00E1n" }), _jsx("th", { children: "Ng\u00E0y t\u1EA1o" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { children: bookings.map((b) => (_jsxs("tr", { children: [_jsx("td", { children: b.bookingCode }), _jsx("td", { children: b.customerName }), _jsx("td", { children: b.customerEmail }), _jsx("td", { children: b.customerPhone }), _jsx("td", { children: (b.ticketPrice + b.comboPrice).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }) }), _jsx("td", { children: b.discountAmount.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }) }), _jsx("td", { children: b.pointsUsed }), _jsx("td", { children: b.totalAmount.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }) }), _jsx("td", { className: `status ${b.status}`, children: b.status }), _jsx("td", { children: b.paymentMethod }), _jsx("td", { children: new Date(b.createdAt).toLocaleString() }), _jsxs("td", { className: "actions", children: [_jsx(TooltipIconButton, { title: "Update", onClick: () => handleEdit(b.id), size: 50, color: "#696969", children: _jsx(BorderColorIcon, { width: 20, height: 20 }) }), _jsx(TooltipIconButton, { title: "Delete", onClick: () => handleDelete(b.id), size: 50, color: "#c52929ff" // icon đỏ
                                                , children: _jsx(DeleteIcon, { width: 20, height: 20 }) }), b.status !== BookingStatus.USED && (
                                            // <button
                                            //   className="checkin"
                                            //   onClick={() => handleCheckin(b.id)}
                                            // >
                                            //   <FaCheck />
                                            // </button>
                                            _jsx(TooltipIconButton, { title: "Checkin", onClick: () => handleCheckin(b.id), size: 50, color: "#000000ff" // icon đỏ
                                                , children: _jsx(QrCodeIcon, { width: 20, height: 20 }) }))] })] }, b.id))) })] })) }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: (page) => setCurrentPage(page), onItemsPerPageChange: (limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(1); // reset về trang 1 khi đổi số item/trang
                }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 2 })] }));
}
