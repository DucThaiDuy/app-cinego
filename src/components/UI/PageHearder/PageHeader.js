import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function PageHeader({ breadcrumbs, action, showBack = false, }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "page-header-wrapper", children: [_jsx("div", { className: "breadcrumb", children: breadcrumbs.map((item, index) => (_jsxs("span", { className: index === breadcrumbs.length - 1 ? "active" : "", onClick: () => item.path && navigate(item.path), children: [item.label, index < breadcrumbs.length - 1 && (_jsx("span", { className: "separator", children: " / " }))] }, index))) }), action && _jsx("div", { className: "page-header", children: action })] }));
}
