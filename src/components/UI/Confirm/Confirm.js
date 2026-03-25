import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./Confirm.scss";
/* ================================
   CONFIRM COMPONENT
================================ */
const Confirm = ({ data, onConfirm, onCancel, }) => {
    const { title = "Xác nhận", message, type = "warning", confirmText = "Xác nhận", cancelText = "Hủy", } = data;
    return (_jsx("div", { className: "confirm-overlay", onClick: onCancel, children: _jsxs("div", { className: `confirm confirm--${type}`, onClick: (e) => e.stopPropagation(), children: [_jsx("h3", { children: title }), _jsx("p", { children: message }), _jsxs("div", { className: "confirm__actions", children: [_jsx("button", { className: "btn-cancel", onClick: onCancel, children: cancelText }), _jsx("button", { className: "btn-confirm", onClick: onConfirm, children: confirmText })] })] }) }));
};
/* ================================
   CONFIRM CONTAINER
================================ */
export const ConfirmContainer = ({ confirms, onRemove, }) => {
    if (!confirms.length)
        return null;
    const current = confirms[0]; // chỉ 1 confirm tại 1 thời điểm
    return (_jsx(Confirm, { data: current, onCancel: () => onRemove(current.id), onConfirm: () => {
            current.onConfirm();
            onRemove(current.id);
        } }));
};
/* ================================
   useConfirm HOOK
================================ */
export const useConfirm = () => {
    const [confirms, setConfirms] = useState([]);
    const confirm = (message, onConfirm, options) => {
        const id = Date.now().toString() + Math.random();
        setConfirms((prev) => [
            ...prev,
            {
                id,
                message,
                onConfirm,
                ...options,
            },
        ]);
    };
    const removeConfirm = (id) => {
        setConfirms((prev) => prev.filter((c) => c.id !== id));
    };
    return {
        confirms,
        confirm,
        removeConfirm,
    };
};
