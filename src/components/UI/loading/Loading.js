import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Loading.tsx
import "./Loading.scss";
export default function Loading({ fullscreen = false, size = "medium", text = "Đang tải...", }) {
    return (_jsx("div", { className: `loading-wrapper ${fullscreen ? "fullscreen" : ""}`, children: _jsxs("div", { className: `loading-container ${size}`, children: [_jsxs("div", { className: "loading-spinner", children: [_jsx("div", { className: "spinner-ring" }), _jsx("div", { className: "spinner-ring" }), _jsx("div", { className: "spinner-ring" })] }), text && _jsx("p", { className: "loading-text", children: text })] }) }));
}
// ============================================
// Các biến thể khác
// ============================================
// Loading Dots
export function LoadingDots({ text = "Đang tải" }) {
    return (_jsxs("div", { className: "loading-dots-wrapper", children: [_jsx("span", { className: "loading-dots-text", children: text }), _jsxs("div", { className: "loading-dots", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })] }));
}
// Loading Bar
export function LoadingBar() {
    return (_jsx("div", { className: "loading-bar-wrapper", children: _jsx("div", { className: "loading-bar" }) }));
}
// Loading Skeleton (cho table rows)
export function LoadingSkeleton({ rows = 5 }) {
    return (_jsx("div", { className: "loading-skeleton", children: Array.from({ length: rows }).map((_, i) => (_jsxs("div", { className: "skeleton-row", children: [_jsx("div", { className: "skeleton-item skeleton-avatar" }), _jsx("div", { className: "skeleton-item skeleton-text" }), _jsx("div", { className: "skeleton-item skeleton-text short" }), _jsx("div", { className: "skeleton-item skeleton-text" })] }, i))) }));
}
