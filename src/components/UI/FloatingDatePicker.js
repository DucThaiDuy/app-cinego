import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./FloatingDatePicker.scss";
export default function FloatingDateField({ label, value, onChange }) {
    const [focused, setFocused] = useState(false);
    const active = focused || !!value;
    const CustomInput = forwardRef(({ value, onClick, onFocus, onBlur }, ref) => (_jsx("input", { ref: ref, value: value, readOnly: true, onClick: onClick, onFocus: (e) => {
            setFocused(true);
            onFocus?.(e);
        }, onBlur: (e) => {
            setFocused(false);
            onBlur?.(e);
        } })));
    return (_jsx("div", { className: `date-field ${active ? "active" : ""}`, children: _jsxs("div", { className: "field-box", children: [_jsx(DatePicker, { selected: value, onChange: onChange, dateFormat: "dd/MM/yyyy", customInput: _jsx(CustomInput, {}), portalId: "root-portal" }), _jsx("span", { className: "icon", children: _jsx(FaCalendarAlt, {}) }), _jsx("label", { children: label })] }) }));
}
