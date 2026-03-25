import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./Search.scss";
import { IoSearch } from "react-icons/io5";
const Search = ({ placeholder = "Search movies...", onSearch, }) => {
    const [value, setValue] = useState("");
    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onSearch?.(val);
    };
    const clearSearch = () => {
        setValue("");
        onSearch?.("");
    };
    return (_jsxs("div", { className: "cinema-search", children: [_jsx("span", { className: "icon", children: _jsx(IoSearch, {}) }), _jsx("input", { type: "text", value: value, onChange: handleChange, placeholder: placeholder }), value && (_jsx("button", { className: "clear-btn", onClick: clearSearch, children: "\u2715" }))] }));
};
export default Search;
