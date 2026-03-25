import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BookingFilter = ({ search, statusFilter, onSearchChange, onStatusChange, }) => {
    return (_jsxs("div", { className: "filter-bar", children: [_jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm theo t\u00EAn kh\u00E1ch/m\u00E3 booking", value: search, onChange: (e) => onSearchChange(e.target.value) }), _jsxs("select", { value: statusFilter, onChange: (e) => onStatusChange(e.target.value), children: [_jsx("option", { value: "all", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: "pending", children: "Ch\u1EDD thanh to\u00E1n" }), _jsx("option", { value: "paid", children: "\u0110\u00E3 thanh to\u00E1n" }), _jsx("option", { value: "used", children: "\u0110\u00E3 s\u1EED d\u1EE5ng" }), _jsx("option", { value: "cancelled", children: "H\u1EE7y" }), _jsx("option", { value: "refunded", children: "Ho\u00E0n ti\u1EC1n" })] })] }));
};
export default BookingFilter;
