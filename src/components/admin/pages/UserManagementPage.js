import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import Pagination from "../../UI/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import { adminUserService } from "../../../api/service/user.service";
import Loading from "../../UI/loading/Loading";
import "./UserManagementPage.scss";
export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [tierFilter, setTierFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminUserService.fetchUsers({
                page: currentPage,
                limit: itemsPerPage,
            });
            if (!data)
                return;
            setUsers(data.items);
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
            await adminUserService.toggleStatus(id);
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
            await adminUserService.deleteUser(id);
            loadUsers();
        }
        catch (err) {
            alert(err.message);
        }
    };
    useEffect(() => {
        setCurrentPage(1); // reset page khi filter
    }, [searchTerm, tierFilter, statusFilter]);
    useEffect(() => {
        loadUsers();
    }, [currentPage, itemsPerPage, searchTerm, tierFilter, statusFilter]);
    const handleUpdate = (id) => alert("Update user id=" + id);
    const getTierBadgeClass = (tier) => ({
        SILVER: "tier-silver",
        GOLD: "tier-gold",
        PLATINUM: "tier-platinum",
        DIAMOND: "tier-diamond",
    }[tier] || "tier-silver");
    return (_jsxs("div", { className: "user-management-page", children: [_jsxs("div", { className: "breadcrumb", children: [_jsx("span", { children: "Trang ch\u1EE7" }), _jsx("span", { children: "/" }), _jsx("span", { children: "Ng\u01B0\u1EDDi d\u00F9ng" }), _jsx("span", { children: "/" }), _jsx("span", { className: "active", children: "Qu\u1EA3n l\u00FD" })] }), _jsx("div", { className: "page-header", children: _jsx("button", { className: "btn-add", children: "+ Th\u00EAm ng\u01B0\u1EDDi d\u00F9ng" }) }), _jsxs("div", { className: "filters", children: [_jsx("input", { type: "text", placeholder: " T\u00ECm theo t\u00EAn, email, s\u1ED1 \u0111i\u1EC7n tho\u1EA1i...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "search-input" }), _jsxs("select", { value: tierFilter, onChange: (e) => setTierFilter(e.target.value), className: "filter-select", children: [_jsx("option", { value: "ALL", children: "T\u1EA5t c\u1EA3 h\u1EA1ng th\u00E0nh vi\u00EAn" }), _jsx("option", { value: "SILVER", children: "\uD83E\uDD48 Silver" }), _jsx("option", { value: "GOLD", children: "\uD83E\uDD47 Gold" }), _jsx("option", { value: "PLATINUM", children: "\uD83D\uDC8E Platinum" }), _jsx("option", { value: "DIAMOND", children: "\uD83D\uDCA0 Diamond" })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "filter-select", children: [_jsx("option", { value: "ALL", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: "active", children: "\u0110ang ho\u1EA1t \u0111\u1ED9ng" }), _jsx("option", { value: "inactive", children: "\u0110\u00E3 kh\u00F3a" })] })] }), _jsxs("div", { className: "stats-cards", children: [_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-icon", children: _jsx(PeopleAltIcon, { fontSize: "inherit" }) }), _jsxs("div", { className: "stat-info", children: [_jsx("span", { className: "stat-label", children: "T\u1ED5ng ng\u01B0\u1EDDi d\u00F9ng" }), _jsx("span", { className: "stat-value", children: totalItems })] })] }), _jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-icon", children: _jsx(Brightness1SharpIcon, { fontSize: "inherit", style: { color: "#227C2A" } }) }), _jsxs("div", { className: "stat-info", children: [_jsx("span", { className: "stat-label", children: "\u0110ang ho\u1EA1t \u0111\u1ED9ng" }), _jsx("span", { className: "stat-value", children: users.filter((u) => u.isActive).length })] })] }), _jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-icon", children: _jsx(DiamondIcon, { fontSize: "inherit" }) }), _jsxs("div", { className: "stat-info", children: [_jsx("span", { className: "stat-label", children: "Th\u00E0nh vi\u00EAn VIP" }), _jsx("span", { className: "stat-value", children: users.filter((u) => u.membershipTier === "PLATINUM" ||
                                            u.membershipTier === "DIAMOND").length })] })] })] }), _jsx("div", { className: "users-table", children: loading ? (
                // <p>Loading...</p>
                _jsx(Loading, {})) : (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "M\u00C3" }), _jsx("th", { children: "Th\u00F4ng tin" }), _jsx("th", { children: "Email / S\u0110T" }), _jsx("th", { children: "H\u1EA1ng th\u00E0nh vi\u00EAn" }), _jsx("th", { children: "\u0110i\u1EC3m" }), _jsx("th", { children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { children: users.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, children: "Kh\u00F4ng t\u00ECm th\u1EA5y ng\u01B0\u1EDDi d\u00F9ng n\u00E0o" }) })) : (users.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.code }), _jsx("td", { children: _jsxs("div", { className: "user-info", children: [_jsx("div", { className: "user-avatar", children: user.avatarUrl ? (_jsx("img", { src: user.avatarUrl, alt: user.fullName })) : (_jsx("span", { children: user.fullName.charAt(0) })) }), _jsxs("div", { children: [_jsx("div", { className: "user-name", children: user.fullName }), _jsxs("div", { className: "user-meta", children: [user.gender, " \u2022 ", user.date_of_birth] })] })] }) }), _jsx("td", { children: _jsxs("div", { className: "contact-info", children: [_jsx("div", { children: user.email }), _jsx("div", { className: "phone", children: user.phone })] }) }), _jsx("td", { children: _jsx("span", { className: `tier-badge ${getTierBadgeClass(user.membershipTier)}`, children: user.membershipTier }) }), _jsx("td", { children: user.totalPoints }), _jsx("td", { children: _jsx("button", { className: `status-badge ${user.isActive ? "active" : "inactive"}`, onClick: () => handleToggleStatus(user.id), children: user.isActive ? "Hoạt động" : "Đã khóa" }) }), _jsxs("td", { children: [_jsx(TooltipIconButton, { title: "Delete", onClick: () => handleDelete(user.id), size: 50, color: "#c52929ff", children: _jsx(DeleteIcon, { width: 20, height: 20 }) }), _jsx(TooltipIconButton, { title: "Update", onClick: () => handleUpdate(user.id), size: 50, color: "#696969", children: _jsx(BorderColorIcon, { width: 20, height: 20 }) })] })] }, user.id)))) })] })) }), _jsx(Pagination, { currentPage: currentPage, totalPages: Math.ceil(totalItems / itemsPerPage), itemsPerPage: itemsPerPage, onPageChange: setCurrentPage, onItemsPerPageChange: (limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(1);
                }, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 3 })] }));
}
