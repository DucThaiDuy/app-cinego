import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function InputField({ label, value, placeholder, type = "text", required, error, textarea, rows = 3, onChange, onBlur, }) {
    return (_jsxs("div", { className: `input-field ${error ? "error" : ""}`, children: [label && (_jsxs("label", { children: [label, " ", required && _jsx("span", { children: "*" })] })), textarea ? (_jsx("textarea", { value: value, placeholder: placeholder, rows: rows, onChange: onChange, onBlur: onBlur })) : (_jsx("input", { type: type, value: value, placeholder: placeholder, onChange: onChange, onBlur: onBlur })), error && _jsx("span", { className: "error-text", children: error })] }));
}
