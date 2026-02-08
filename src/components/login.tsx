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

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = t("error_email_required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("error_email_invalid");
    }

    if (!password) {
      newErrors.password = t("error_password_required");
    } else if (password.length < 6) {
      newErrors.password = t("error_password_length");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log({ email, password });

    // Chuyển hướng sang home
    navigate("/home"); // <-- thêm dòng này
  };

  return (
    <div className="login-page">
      <LanguageSwitcher />

      <div className="login-card">
        <h1 className="title">{t("login_title")}</h1>
        <p className="subtitle">{t("login_subtitle")}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("email")}</label>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: undefined });
              }}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>{t("password")}</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? t("hide") : t("show")}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-login">
            {t("login")}
          </button>
        </form>

        <div className="divider">
          <span>{t("or")}</span>
        </div>

        <button className="btn-google">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          {t("login_google")}
        </button>

        <div className="extra">
          <a href="#">{t("forgot_password")}</a>
          <span> · </span>
          <a href="#">{t("register")}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
