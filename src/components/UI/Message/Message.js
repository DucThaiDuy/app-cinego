import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./Message.scss";
const Message = ({ type = "info", text, duration = 3000, onClose, }) => {
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);
    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };
    const getIcon = () => {
        const icons = {
            success: "✓",
            error: "✕",
            warning: "⚠",
            info: "ℹ",
        };
        return icons[type];
    };
    return (_jsxs("div", { className: `message message--${type} ${isExiting ? "exit" : ""}`, children: [_jsxs("div", { className: "message__content", children: [_jsx("span", { className: "message__icon", children: getIcon() }), _jsx("span", { className: "message__text", children: text }), _jsx("button", { className: "message__close", onClick: handleClose, children: "\u2715" })] }), _jsx("div", { className: "message__progress", style: { animationDuration: `${duration}ms` } })] }));
};
export default Message;
export const MessageContainer = ({ messages, onRemove, }) => {
    return (_jsx("div", { className: "message-container", children: messages.map((msg) => (_jsx(Message, { type: msg.type, text: msg.text, onClose: () => onRemove(msg.id) }, msg.id))) }));
};
// ====================================
// CUSTOM HOOK - useMessage
// ====================================
export const useMessage = () => {
    const [messages, setMessages] = useState([]);
    const showMessage = (text, type = "info") => {
        const id = Date.now().toString() + Math.random();
        setMessages((prev) => [...prev, { id, type, text }]);
    };
    const removeMessage = (id) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };
    return {
        messages,
        showMessage,
        success: (text) => showMessage(text, "success"),
        error: (text) => showMessage(text, "error"),
        warning: (text) => showMessage(text, "warning"),
        info: (text) => showMessage(text, "info"),
        removeMessage,
    };
};
