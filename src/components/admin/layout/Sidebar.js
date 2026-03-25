import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { ROUTES } from "../../../constants/routes";
export default function Sidebar({ isOpen, basePath, role }) {
    return (_jsxs("aside", { className: `sidebar ${isOpen ? "open" : "closed"}`, children: [_jsxs("div", { className: "sidebar__logo", children: [_jsx(LocalMoviesIcon, { className: "sidebar__logo-icon" }), _jsx("span", { className: "sidebar__logo-text", children: "CineGo" })] }), _jsxs("nav", { className: "sidebar__menu", children: [role === "ADMIN" && (_jsxs(_Fragment, { children: [_jsx(NavItem, { to: `${basePath}/${ROUTES.ADMIN.DASHBOARD}`, label: "Dashboard" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.ADMIN.CINEMAS}`, label: "R\u1EA1p phim" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.ADMIN.USERS}`, label: "Ng\u01B0\u1EDDi d\u00F9ng" })] })), role === "MANAGER" && (_jsxs(_Fragment, { children: [_jsx(NavItem, { to: `${basePath}/${ROUTES.MANAGER.MOVIES}`, label: "Phim" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.MANAGER.GENRES}`, label: "Th\u1EC3 lo\u1EA1i" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.MANAGER.ACTORS}`, label: "Di\u1EC5n vi\u00EAn" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.MANAGER.SHOWTIMES}`, label: "L\u1ECBch chi\u1EBFu" }), _jsx(NavItem, { to: `${basePath}/${ROUTES.MANAGER.BOOKINGS}`, label: "\u0110\u1EB7t v\u00E9" })] }))] })] }));
}
function NavItem({ to, label, icon }) {
    return (_jsxs(NavLink, { to: to, end: true, className: ({ isActive }) => `sidebar__item${isActive ? " active" : ""}`, children: [icon && _jsx("span", { className: "sidebar__icon", children: icon }), _jsx("span", { className: "sidebar__label", children: label })] }));
}
