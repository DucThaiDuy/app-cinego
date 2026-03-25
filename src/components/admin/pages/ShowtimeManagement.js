import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import Pagination from "../../UI/Pagination";
import { useNavigate } from "react-router-dom";
import "./showtime.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { adminShowTimeService } from "../../../api/service/showTime.service";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
export default function ShowtimeManagement() {
    const navigate = useNavigate();
    const message = useMessage();
    const { confirms, confirm, removeConfirm } = useConfirm();
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    /* ===== FILTER ===== */
    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [formatFilter, setFormatFilter] = useState("ALL");
    const loadShowTimes = useCallback(async (page, size) => {
        setLoading(true);
        try {
            const data = await adminShowTimeService.fetchUsers({
                page,
                limit: size,
            });
            if (!data)
                return;
            setShowtimes(data.items);
            console.log("Fetched showtimes:", data.items);
            setTotalItems(data.totalItems);
        }
        catch (err) {
            console.error(err.message);
        }
        finally {
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
    const handleDelete = (id) => {
        confirm("Bạn có chắc chắn muốn xóa diễn viên này?", () => {
            setShowtimes((prev) => prev.filter((a) => a.id !== id));
            try {
                adminShowTimeService.deleteUser(id);
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
    const handleUpdate = (id) => {
        // alert("Update showtime id = " + id);
        message.info(`Đang mở form sửa user #${id}`);
    };
    return (_jsxs("div", { className: "showtime-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(ConfirmContainer, { confirms: confirms, onRemove: removeConfirm }), _jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim", path: "/admin/movies" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Lịch chiếu" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => navigate("/admin/showtime/add-showtime"), children: "+ Th\u00EAm l\u1ECBch chi\u1EBFu" }) }), _jsxs("div", { className: "showtime-filter", children: [_jsxs("div", { className: "search-box", children: [_jsx(FaSearch, {}), _jsx("input", { placeholder: "T\u00ECm theo t\u00EAn phim...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), children: [_jsx("option", { value: "ALL", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: "AVAILABLE", children: "C\u00F2n v\u00E9" }), _jsx("option", { value: "FULL", children: "H\u1EBFt v\u00E9" }), _jsx("option", { value: "CANCELLED", children: "H\u1EE7y" }), _jsx("option", { value: "ENDED", children: "\u0110\u00E3 chi\u1EBFu" })] })] }), _jsx("div", { className: "showtime-table-wrapper", children: _jsxs("table", { className: "showtime-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Phim" }), _jsx("th", { children: "R\u1EA1p" }), _jsx("th", { children: "Ph\u00F2ng" }), _jsx("th", { children: "Ng\u00E0y" }), _jsx("th", { children: "Gi\u1EDD" }), _jsx("th", { children: "\u0110\u1ECBnh d\u1EA1ng" }), _jsx("th", { children: "Ng\u00F4n ng\u1EEF" }), _jsx("th", { children: "Gh\u1EBF tr\u1ED1ng" }), _jsx("th", { children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { children: showtimes.map((s) => (_jsxs("tr", { children: [_jsxs("td", { className: "movie", children: [_jsx("img", { src: s.posterUrl, alt: s.movie_title }), _jsx("span", { className: "movie-title", children: s.movie_title })] }), _jsx("td", { children: s.cinema_name }), _jsx("td", { children: s.hall_name }), _jsx("td", { children: s.date }), _jsx("td", { children: s.time }), _jsx("td", { className: "format", children: s.format }), _jsx("td", { children: s.language === "subtitle" ? "Phụ đề" : "Lồng tiếng" }), _jsx("td", { children: s.availableSeats }), _jsx("td", { children: _jsx("span", { className: `status ${s.status}`, children: s.status }) }), _jsxs("td", { className: "actions", children: [_jsx(TooltipIconButton, { title: "X\u00F3a", onClick: () => handleDelete(s.id), size: 38, color: "#c52929", children: _jsx(DeleteIcon, {}) }), _jsx(TooltipIconButton, { title: "C\u1EADp nh\u1EADt", onClick: () => handleUpdate(s.id), size: 38, color: "#555", children: _jsx(BorderColorIcon, {}) })] })] }, s.id))) })] }) }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: setCurrentPage, onItemsPerPageChange: (limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(1);
                }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 2 })] }));
}
