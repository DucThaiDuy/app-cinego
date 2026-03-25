import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
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
export default function CinemaManagement() {
    const navigate = useNavigate();
    const message = useMessage();
    const { confirms, confirm, removeConfirm } = useConfirm();
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    /* ===== FILTER ===== */
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const loadCinemas = useCallback(async (page, size) => {
        setLoading(true);
        try {
            const data = await adminCinemaService.fetch({
                page,
                limit: size,
            });
            if (!data)
                return;
            setCinemas(data.items);
            console.log("Fetched Cinema:", data.items);
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
        loadCinemas(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage, loadCinemas]); // Thêm dependencies
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);
    /* ================= CRUD ================= */
    const handleDelete = (id) => {
        confirm("Bạn có chắc chắn muốn xóa rạp phim này?", () => {
            setCinemas((prev) => prev.filter((a) => a.id !== id));
            try {
                adminCinemaService.delete(id);
                // loadActors();
                message.success("Xóa rạp phim thành công");
            }
            catch (err) {
                console.log(err.message);
                message.error("Xóa rạp phim thất bại: ");
            }
        }, {
            type: "danger",
            title: "Xóa rạp phim",
            confirmText: "Xóa",
            cancelText: "Hủy",
        });
    };
    const handleUpdate = (id) => {
        // alert("Update showtime id = " + id);
        message.info(`Đang mở form sửa user #${id}`);
    };
    /* ================= RENDER ================= */
    return (_jsxs("div", { className: "cinema-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(ConfirmContainer, { confirms: confirms, onRemove: removeConfirm }), _jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    // { label: "Quản lý phim", path: "/admin/movies" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Quản Lý rạp phim" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => navigate("/admin/cinema/add-cinema"), children: "+ Th\u00EAm R\u1EA1p phim" }) }), _jsxs("div", { className: "filters", children: [_jsx("input", { placeholder: "T\u00ECm theo th\u00E0nh ph\u1ED1...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), children: [_jsx("option", { value: "", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: CINEMA_STATUS.ACTIVE, children: "Ho\u1EA1t \u0111\u1ED9ng" }), _jsx("option", { value: CINEMA_STATUS.INACTIVE, children: "Ng\u01B0ng ho\u1EA1t \u0111\u1ED9ng" }), _jsx("option", { value: CINEMA_STATUS.MAINTENANCE, children: "B\u1EA3o tr\u00EC" })] })] }), _jsx("div", { className: "cinema-table", children: loading ? (
                // <p>Loading...</p>
                _jsx(Loading, {})) : (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "M\u00C3" }), _jsx("th", { children: "T\u00EAn r\u1EA1p" }), _jsx("th", { children: "\u0110\u1ECBa ch\u1EC9" }), _jsx("th", { children: "Th\u00E0nh ph\u1ED1" }), _jsx("th", { children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { children: [cinemas.map((c) => (_jsxs("tr", { children: [_jsx("td", { children: c.code }), _jsx("td", { className: "name", children: c.name }), _jsxs("td", { children: [c.address, ", ", c.ward, ", ", c.district] }), _jsx("td", { children: c.city }), _jsx("td", { children: _jsx("span", { className: `status ${c.status}`, children: c.status === CINEMA_STATUS.ACTIVE
                                                    ? "Hoạt động"
                                                    : c.status === CINEMA_STATUS.INACTIVE
                                                        ? "Ngưng"
                                                        : "Bảo trì" }) }), _jsxs("td", { className: "actions", children: [_jsx(TooltipIconButton, { title: "Update", onClick: () => handleUpdate(c.id), size: 50, color: "#696969", children: _jsx(BorderColorIcon, { width: 20, height: 20 }) }), _jsx(TooltipIconButton, { title: "Delete", onClick: () => handleDelete(c.id), size: 50, color: "#c52929ff", children: _jsx(DeleteIcon, { width: 20, height: 20 }) })] })] }, c.id))), cinemas.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "empty", children: "Kh\u00F4ng c\u00F3 r\u1EA1p n\u00E0o" }) }))] })] })) }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: setCurrentPage, onItemsPerPageChange: (limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(1);
                }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 3 })] }));
}
