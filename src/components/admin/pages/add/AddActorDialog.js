import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FloatingInput from "../../../UI/FloatingInput";
import FloatingTextarea from "../../../UI/FloatingTextarea";
import "./scss/add-actor-dialog.scss";
export default function AddActorDialog({ isOpen, onClose, onAdd, }) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const handleSubmit = () => {
        if (!name || !slug)
            return alert("Tên và slug là bắt buộc!");
        onAdd({ name, slug, bio, avatarUrl: avatar });
        // reset
        setName("");
        setSlug("");
        setBio("");
        setAvatar("");
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "dialog-overlay", onClick: onClose, children: _jsxs("div", { className: "dialog-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { children: "Th\u00EAm di\u1EC5n vi\u00EAn m\u1EDBi" }), _jsx(FloatingInput, { label: "T\u00EAn di\u1EC5n vi\u00EAn", name: "name", value: name, required: true, onChange: (e) => setName(e.target.value) }), _jsx(FloatingInput, { label: "Slug", name: "slug", value: slug, required: true, onChange: (e) => setSlug(e.target.value) }), _jsx(FloatingTextarea, { label: "Ti\u1EC3u s\u1EED", name: "bio", value: bio, onChange: (e) => setBio(e.target.value), rows: 5 }), _jsx(FloatingInput, { label: "Avatar URL", name: "avatar_url", value: avatar, onChange: (e) => setAvatar(e.target.value) }), _jsxs("div", { className: "dialog-actions", children: [_jsx("button", { className: "btn-cancel", onClick: onClose, children: "H\u1EE7y" }), _jsx("button", { className: "btn-submit", onClick: handleSubmit, children: "Th\u00EAm" })] })] }) }));
}
