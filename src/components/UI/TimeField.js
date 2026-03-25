import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./InputField.scss";
const TimeField = ({ value, placeholder = "--:--", error, required = false, onChange, }) => {
    return (_jsxs("div", { className: "input-field", children: [_jsx("div", { className: "input-field__wrapper", children: _jsx("input", { type: "time", value: value, placeholder: placeholder, required: required, onChange: onChange, className: `input-field__input ${error ? "input-field__input--error" : ""}` }) }), error && _jsx("p", { className: "input-field__error", children: error })] }));
};
export default TimeField;
