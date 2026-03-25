import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./floating-input.scss";
export default function FloatingInput({ label, name, value = "", required = false, errorText = "Trường này là bắt buộc", onChange, }) {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const isActive = focused || value.length > 0;
    const showError = required && touched && value.trim() === "";
    return (_jsxs("div", { className: `input-field ${isActive ? "active" : ""}`, children: [_jsx("input", { name: name, value: value, onChange: onChange, onFocus: () => setFocused(true), onBlur: () => {
                    setFocused(false);
                    setTouched(true);
                } }), _jsxs("label", { children: [label, required && _jsx("span", { className: "required", children: "*" })] }), showError && _jsx("div", { className: "input-error", children: errorText })] }));
}
