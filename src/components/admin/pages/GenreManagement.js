import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./GenreManagement.scss";
import { useState, useCallback, useEffect } from "react";
import Pagination from "../../UI/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import AddGenreDialog from "./add/AddGenreDialog";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { adminGenreService } from "../../../api/service/genre.service";
import { MessageContainer, useMessage, } from "../../UI/Message/Message";
import { MESSAGES } from "../../../constants/ui-text";
export default function GenreManagement() {
    const [genres, setGenres] = useState([]);
    const message = useMessage();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminGenreService.fetchUsers({
                page: currentPage,
                limit: itemsPerPage,
            });
            if (!data)
                return;
            setGenres(data.items);
            setTotalItems(data.totalItems);
            setCurrentPage(data.currentPage);
            setItemsPerPage(data.itemsPerPage);
        }
        catch (err) {
            console.error(err.message);
        }
        finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage]);
    const handleToggleStatus = async (id) => {
        try {
            await adminGenreService.toggleStatus(id);
            loadUsers();
        }
        catch (err) {
            alert(err.message);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?"))
            return;
        try {
            await adminGenreService.deleteUser(id);
            loadUsers();
        }
        catch (err) {
            alert(err.message);
        }
    };
    useEffect(() => {
        setCurrentPage(1); // reset page khi filter
    }, [searchTerm]);
    useEffect(() => {
        loadUsers();
    }, [currentPage, itemsPerPage, searchTerm]);
    const handleUpdate = (id) => {
        // ✅ SỬ DỤNG MESSAGE INFO
        message.info(`Đang mở form sửa user #${id}`);
        // TODO: Navigate to edit page
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleAddGenre = async (data) => {
        try {
            const newGenre = await adminGenreService.addGenre(data);
            setGenres((prev) => [newGenre, ...prev]); // add lên đầu list
            setIsDialogOpen(false);
            message.success(MESSAGES.ADD_SUCCESS);
        }
        catch (error) {
            message.error(MESSAGES.ADD_ERROR);
            console.error("Add genre failed", error);
        }
    };
    return (_jsxs("div", { className: "genre-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim", path: "/admin/movies" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Thể loại" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => setIsDialogOpen(true), children: "+ Th\u00EAm phim" }) }), _jsx("div", { className: "genre-filter", children: _jsx("input", { placeholder: " T\u00ECm theo t\u00EAn ho\u1EB7c slug..." }) }), _jsxs("div", { className: "genre-table", children: [_jsxs("div", { className: "table-head", children: [_jsx("span", { children: "T\u00EAn" }), _jsx("span", { children: "Slug" }), _jsx("span", { children: "M\u00F4 t\u1EA3" }), _jsx("span", { children: "Ng\u00E0y t\u1EA1o" }), _jsx("span", { children: "C\u1EADp nh\u1EADt" }), _jsx("span", { children: "H\u00E0nh \u0111\u1ED9ng" })] }), genres.map((g) => (_jsxs("div", { className: "table-row", children: [_jsx("strong", { children: g.name }), _jsx("span", { className: "slug", children: g.slug }), _jsx("span", { className: "desc", children: g.description }), _jsx("span", { children: g.createdAt }), _jsx("span", { children: g.updatedAt }), _jsxs("div", { className: "actions", children: [_jsx(TooltipIconButton, { title: "Delete", onClick: () => handleDelete(g.id), size: 50, color: "#c52929ff" // icon đỏ
                                        , children: _jsx(DeleteIcon, { width: 20, height: 20 }) }), _jsx(TooltipIconButton, { title: "Update", onClick: () => handleUpdate(g.id), size: 50, color: "#696969", children: _jsx(BorderColorIcon, { width: 20, height: 20 }) })] })] }, g.id))), _jsx(AddGenreDialog, { isOpen: isDialogOpen, onClose: () => setIsDialogOpen(false), onAdd: handleAddGenre }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: (page) => setCurrentPage(page), onItemsPerPageChange: (limit) => {
                            setItemsPerPage(limit);
                            setCurrentPage(1); // reset về trang 1 khi đổi số item/trang
                        }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 2 })] })] }));
}
