import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Header.tsx
import { useState, useRef, useEffect } from "react";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./layout.scss";
import { authService } from "../../../api/service/auth.service";
import { useNavigate } from "react-router-dom";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { UI_TEXT } from "../../../constants/ui-text";
import { ROUTES } from "../../../constants/routes";
export default function Header({ toggleSidebar }) {
    const navigate = useNavigate();
    const message = useMessage();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { confirms, confirm, removeConfirm } = useConfirm();
    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleLogout = () => {
        confirm(UI_TEXT.CONFIRM.CONFIRM_ACTION, () => {
            try {
                // ✅ logout qua service
                authService.logout();
                // ✅ đóng dropdown (UX)
                setShowDropdown(false);
                // ✅ về trang login
                navigate(ROUTES.CLIENT.LOGIN, { replace: true });
            }
            catch (err) {
                // console.log(err.message);
                message.error(UI_TEXT.AUTH.LOGOUT_FAILED);
            }
        }, {
            type: UI_TEXT.CONFIRM.TYPE_DANGER,
            title: UI_TEXT.CONFIRM.TITLE_LOGOUT,
            confirmText: UI_TEXT.CONFIRM.CONFIRMTEXT,
            cancelText: UI_TEXT.CONFIRM.CANCELTEXT,
        });
    };
    return (_jsxs("header", { className: "admin-header", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsx(ConfirmContainer, { confirms: confirms, onRemove: removeConfirm }), _jsxs("div", { className: "admin-header__left", children: [_jsx("button", { className: "admin-header__toggle", onClick: toggleSidebar, children: "\u2630" }), _jsx("span", { className: "admin-header__title", children: "Admin Dashboard" }), _jsx("span", { className: "admin-header__title", children: "Ch\u00FAc m\u1EEBng n\u0103m m\u1EDBi" })] }), _jsx("div", { className: "admin-header__right", children: _jsxs("div", { className: "admin-user", onClick: () => setShowDropdown(!showDropdown), ref: dropdownRef, children: [_jsx("img", { src: "https://i.pinimg.com/736x/f3/0c/ab/f30cab06a4b29111703d7b3f333b0037.jpg", alt: "admin" }), _jsx("span", { children: "Admin" }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: `dropdown-arrow ${showDropdown ? "open" : ""}`, children: _jsx("polyline", { points: "6 9 12 15 18 9" }) }), showDropdown && (_jsxs("div", { className: "admin-dropdown", children: [_jsxs("a", { href: "/admin/profile", className: "dropdown-item", children: [_jsx("span", { className: "dropdown-icon", children: _jsx(PersonSharpIcon, {}) }), _jsx("span", { children: "Th\u00F4ng tin c\u00E1 nh\u00E2n" })] }), _jsxs("a", { href: "/admin/settings", className: "dropdown-item", children: [_jsx("span", { className: "dropdown-icon", children: _jsx(SettingsOutlinedIcon, {}) }), _jsx("span", { children: "C\u00E0i \u0111\u1EB7t" })] }), _jsxs("a", { href: "/admin/activity-logs", className: "dropdown-item", children: [_jsx("span", { className: "dropdown-icon", children: _jsx(ManageHistoryOutlinedIcon, {}) }), _jsx("span", { children: "L\u1ECBch s\u1EED ho\u1EA1t \u0111\u1ED9ng" })] }), _jsx("div", { className: "dropdown-divider" }), _jsxs("a", { onClick: handleLogout, className: "dropdown-item logout", children: [_jsx("span", { className: "dropdown-icon", children: _jsx(LogoutRoundedIcon, {}) }), _jsx("span", { children: "\u0110\u0103ng xu\u1EA5t" })] })] }))] }) })] }));
}
