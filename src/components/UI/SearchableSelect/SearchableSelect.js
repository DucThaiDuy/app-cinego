import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import "./searchable-select.scss";
/* ===== COMPONENT ===== */
export default function SearchableSelect({ label, placeholder = "Chọn...", options, value, onChange, }) {
    const wrapperRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const selected = options.find((o) => o.value === value);
    const filteredOptions = options.filter((o) => o.label.toLowerCase().includes(keyword.toLowerCase()));
    /* close when click outside */
    useEffect(() => {
        const handleClick = (e) => {
            if (!wrapperRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    return (_jsxs("div", { className: "searchable-select", ref: wrapperRef, children: [label && _jsx("label", { children: label }), _jsxs("div", { className: `select-box ${open ? "open" : ""}`, onClick: () => setOpen(true), children: [selected ? (_jsx("span", { children: selected.label })) : (_jsx("span", { className: "placeholder", children: placeholder })), _jsx("i", { className: "arrow" })] }), open && (_jsx("div", { className: "dropdown", children: _jsxs("ul", { children: [_jsx("li", { className: "search-option", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm...", value: keyword, onChange: (e) => setKeyword(e.target.value), autoFocus: true }) }), filteredOptions.length === 0 && (_jsx("li", { className: "empty", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" })), filteredOptions.map((o) => (_jsxs("li", { onClick: () => {
                                onChange(o.value);
                                setOpen(false);
                                setKeyword("");
                            }, children: [o.image && _jsx("img", { src: o.image }), o.label] }, o.value)))] }) }))] }));
}
