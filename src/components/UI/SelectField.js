import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SelectField({ value, options, required, error, onChange, }) {
    return (_jsxs("div", { className: `select-field ${error ? "error" : ""}`, children: [_jsx("select", { value: value, required: required, onChange: (e) => onChange(e.target.value), children: options.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }), error && _jsx("span", { className: "error-text", children: error })] }));
}
