import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Login.tsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaGoogle, FaFacebook, } from "react-icons/fa";
import "./LoginAdmin.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { authService } from "../../../../api/service/auth.service";
import { MessageContainer, useMessage } from "../../../UI/Message/Message";
import { UI_TEXT } from "../../../../constants/ui-text";
export default function LoginAdmin() {
    const navigate = useNavigate();
    const message = useMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const handleSubmit = async () => {
        if (!email || !password) {
            // alert("Vui lòng nhập email và mật khẩu");
            message.error(UI_TEXT.AUTH.ENTER_EMAIL_PASSWORD);
            return;
        }
        try {
            setLoading(true);
            const data = await authService.login(email, password);
            const redirectPath = ROUTES.ROLE_REDIRECT_MAP[data.role];
            if (!redirectPath) {
                // alert("Role không hợp lệ");
                message.error(UI_TEXT.AUTH.INVALID_ROLE);
                return;
            }
            navigate(redirectPath, { replace: true });
        }
        catch (error) {
            // alert(error?.response?.data?.message || "Email hoặc mật khẩu không đúng");
            message.error(UI_TEXT.AUTH.INCORRECT_EMAIL_PASSWORD);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "login-page", children: [_jsx(MessageContainer, { messages: message.messages, onRemove: message.removeMessage }), _jsxs("div", { className: "login-background", children: [_jsx("div", { className: "circle circle-1" }), _jsx("div", { className: "circle circle-2" })] }), _jsx("div", { className: "login-container", children: _jsxs("div", { className: "login-card", children: [_jsxs("div", { className: "login-header", children: [_jsx("div", { className: "logo-icon", children: _jsx(FaLock, {}) }), _jsx("h1", { className: "login-title", children: "Ch\u00E0o m\u1EEBng tr\u1EDF l\u1EA1i" }), _jsx("p", { className: "login-subtitle", children: "\u0110\u0103ng nh\u1EADp \u0111\u1EC3 ti\u1EBFp t\u1EE5c" }), _jsx("p", { children: "admin@cinego.com / manager.hn@cinego.com / 123456" })] }), _jsxs("div", { className: "login-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "Email" }), _jsxs("div", { className: "input-wrapper", children: [_jsx(FaEnvelope, { className: "input-icon" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "example@email.com", className: "form-input" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "form-label", children: "M\u1EADt kh\u1EA9u" }), _jsxs("div", { className: "input-wrapper", children: [_jsx(FaLock, { className: "input-icon" }), _jsx("input", { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "form-input" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "toggle-password", children: showPassword ? _jsx(FaEyeSlash, {}) : _jsx(FaEye, {}) })] })] }), _jsxs("div", { className: "form-options", children: [_jsxs("label", { className: "checkbox-label", children: [_jsx("input", { type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), className: "checkbox-input" }), _jsx("span", { children: "Ghi nh\u1EDB \u0111\u0103ng nh\u1EADp" })] }), _jsx("a", { href: "#", className: "forgot-link", children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" })] }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: `btn-submit ${loading ? "loading" : ""}`, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner" }), "\u0110ang x\u1EED l\u00FD..."] })) : ("Đăng nhập") })] }), _jsx("div", { className: "divider", children: _jsx("span", { children: "Ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi" }) }), _jsxs("div", { className: "social-login", children: [_jsxs("button", { className: "social-btn google", children: [_jsx(FaGoogle, {}), _jsx("span", { children: "Google" })] }), _jsxs("button", { className: "social-btn facebook", children: [_jsx(FaFacebook, {}), _jsx("span", { children: "Facebook" })] })] }), _jsxs("p", { className: "signup-text", children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", " ", _jsx("a", { href: "#", className: "signup-link", children: "\u0110\u0103ng k\u00FD ngay" })] })] }) })] }));
}
