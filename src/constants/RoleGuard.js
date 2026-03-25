import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function RoleGuard({ allow, children }) {
    const token = localStorage.getItem("access_token");
    const adminInfo = JSON.parse(localStorage.getItem("admin_info") || "{}");
    const role = adminInfo.role;
    if (!token) {
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    }
    if (!role || !allow.includes(role)) {
        return _jsx(Navigate, { to: "/403", replace: true });
    }
    return children;
}
