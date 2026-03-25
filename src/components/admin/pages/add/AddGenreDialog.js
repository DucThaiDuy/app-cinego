import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FloatingInput from "../../../UI/FloatingInput";
import FloatingTextarea from "../../../UI/FloatingTextarea";
import "./scss/add-genre-dialog.scss";
const AddGenreDialog = ({ isOpen, onClose, onAdd, }) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = () => {
        if (!name || !slug)
            return alert("Tên và slug là bắt buộc!");
        onAdd({ name, slug, description });
        setName("");
        setSlug("");
        setDescription("");
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "dialog-overlay", onClick: onClose, children: _jsxs("div", { className: "dialog-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { children: "Th\u00EAm th\u1EC3 lo\u1EA1i m\u1EDBi" }), _jsx(FloatingInput, { label: "T\u00EAn th\u1EC3 lo\u1EA1i", name: "name", value: name, required: true, onChange: (e) => setName(e.target.value) }), _jsx(FloatingInput, { label: "Slug", name: "slug", value: slug, required: true, onChange: (e) => setSlug(e.target.value) }), _jsx(FloatingTextarea, { label: "M\u00F4 t\u1EA3 th\u1EC3 lo\u1EA1i", name: "description", value: description, onChange: (e) => setDescription(e.target.value), rows: 4 }), _jsxs("div", { className: "dialog-actions", children: [_jsx("button", { className: "btn-cancel", onClick: onClose, children: "H\u1EE7y" }), _jsx("button", { className: "btn-submit", onClick: handleSubmit, children: "Th\u00EAm" })] })] }) }));
};
export default AddGenreDialog;
