import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.scss";
export default function AdminBaseLayout({ basePath, role, }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (_jsxs("div", { className: `admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`, children: [_jsx(Sidebar, { isOpen: sidebarOpen, basePath: basePath, role: role }), _jsxs("div", { className: "admin-main", children: [_jsx(Header, { toggleSidebar: () => setSidebarOpen(!sidebarOpen) }), _jsx("main", { className: "admin-content", children: _jsx(Outlet, {}) })] })] }));
}
