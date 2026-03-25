import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // <-- import
import "./Login.scss";
import LanguageSwitcher from "./components/LanguageSwitcher";
const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // <-- tạo navigate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = t("error_email_required");
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t("error_email_invalid");
        }
        if (!password) {
            newErrors.password = t("error_password_required");
        }
        else if (password.length < 6) {
            newErrors.password = t("error_password_length");
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate())
            return;
        console.log({ email, password });
        // Chuyển hướng sang home
        navigate("/home"); // <-- thêm dòng này
    };
    return (_jsxs("div", { className: "login-page", children: [_jsx(LanguageSwitcher, {}), _jsxs("div", { className: "login-card", children: [_jsx("h1", { className: "title", children: t("login_title") }), _jsx("p", { className: "subtitle", children: t("login_subtitle") }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: t("email") }), _jsx("input", { type: "email", placeholder: t("emailPlaceholder"), value: email, onChange: (e) => {
                                            setEmail(e.target.value);
                                            setErrors({ ...errors, email: undefined });
                                        } }), errors.email && _jsx("p", { className: "error-text", children: errors.email })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: t("password") }), _jsxs("div", { className: "password-wrapper", children: [_jsx("input", { type: showPassword ? "text" : "password", placeholder: t("passwordPlaceholder"), value: password, onChange: (e) => {
                                                    setPassword(e.target.value);
                                                    setErrors({ ...errors, password: undefined });
                                                } }), _jsx("span", { className: "toggle", onClick: () => setShowPassword(!showPassword), children: showPassword ? t("hide") : t("show") })] }), errors.password && _jsx("p", { className: "error-text", children: errors.password })] }), _jsx("button", { type: "submit", className: "btn-login", children: t("login") })] }), _jsx("div", { className: "divider", children: _jsx("span", { children: t("or") }) }), _jsxs("button", { className: "btn-google", children: [_jsx("img", { src: "https://www.svgrepo.com/show/475656/google-color.svg", alt: "Google" }), t("login_google")] }), _jsxs("div", { className: "extra", children: [_jsx("a", { href: "#", children: t("forgot_password") }), _jsx("span", { children: " \u00B7 " }), _jsx("a", { href: "#", children: t("register") })] })] })] }));
};
export default Login;
