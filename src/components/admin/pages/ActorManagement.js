import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddActorDialog from "./add/AddActorDialog";
import Pagination from "../../UI/Pagination";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import "./actor.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { adminActorService } from "../../../api/service/actor.service";
import { MESSAGES } from "../../../constants/ui-text";
// import { useConfirm } from "../../UI/Confirm/Confirm";
export default function ActorManagement() {
    const [actors, setActors] = useState([]);
    const message = useMessage();
    const { confirms, confirm, removeConfirm } = useConfirm();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const loadActors = async (page, size) => {
        setLoading(true);
        try {
            const data = await adminActorService.fetchUsers({
                page,
                limit: size,
            });
            if (!data)
                return;
            setActors(data.items);
            setTotalItems(data.totalItems);
        }
        catch (err) {
            console.error(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setCurrentPage(1); // reset page khi filter
    }, [searchTerm]);
    useEffect(() => {
        loadActors(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage, searchTerm]);
    /* ===== CRUD ===== */
    const handleDelete = (id) => {
        confirm("Bạn có chắc chắn muốn xóa diễn viên này?", () => {
            setActors((prev) => prev.filter((a) => a.id !== id));
            try {
                adminActorService.deleteUser(id);
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
        // alert("Update actor id = " + id);
        message.info(`Đang mở form sửa user #${id}`);
    };
    const handleAddActor = async (data) => {
        try {
            const newGenre = await adminActorService.addGenre(data);
            setActors((prev) => [newGenre, ...prev]); // add lên đầu list
            setIsDialogOpen(false);
            message.success(MESSAGES.ADD_SUCCESS);
        }
        catch (error) {
            message.error(MESSAGES.ADD_ERROR);
            console.error("Add genre failed", error);
        }
    };
    return (_jsxs("div", { className: "actor-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(ConfirmContainer, { confirms: confirms, onRemove: removeConfirm }), _jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim", path: "/admin/movies" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Diễn viên" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => setIsDialogOpen(true), children: "+ Th\u00EAm di\u1EC5n vi\u00EAn" }) }), _jsxs("div", { className: "actor-page__search", children: [_jsx(FaSearch, { className: "search-icon" }), _jsx("input", { placeholder: "T\u00ECm theo t\u00EAn ho\u1EB7c slug...", value: searchTerm, onChange: (e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        } })] }), _jsxs("div", { className: "actor-table-wrapper", children: [_jsxs("table", { className: "actor-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u1EA2nh" }), _jsx("th", { children: "T\u00EAn" }), _jsx("th", { children: "Slug" }), _jsx("th", { children: "M\u00F4 t\u1EA3" }), _jsx("th", { children: "Ng\u00E0y t\u1EA1o" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { children: actors.map((a) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("img", { src: a.avatarUrl || "/avatar.png", className: "actor-avatar" }) }), _jsx("td", { children: a.name }), _jsx("td", { className: "slug", children: a.slug }), _jsx("td", { className: "bio", children: a.bio }), _jsx("td", { children: a.createdAt }), _jsxs("td", { className: "actions", children: [_jsx(TooltipIconButton, { title: "X\u00F3a", onClick: () => handleDelete(a.id), size: 40, color: "#c52929", children: _jsx(DeleteIcon, {}) }), _jsx(TooltipIconButton, { title: "C\u1EADp nh\u1EADt", onClick: () => handleUpdate(a.id), size: 40, color: "#555", children: _jsx(BorderColorIcon, {}) })] })] }, a.id))) })] }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: setCurrentPage, onItemsPerPageChange: (limit) => {
                            setItemsPerPage(limit);
                            setCurrentPage(1);
                        }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 2 })] }), _jsx(AddActorDialog, { isOpen: isDialogOpen, onClose: () => setIsDialogOpen(false), onAdd: handleAddActor })] }));
}
