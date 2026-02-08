// Login.tsx
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import "./LoginAdmin.scss";
import { service } from "../../../../api/service/httpClient";
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

      const redirectPath =
        ROUTES.ROLE_REDIRECT_MAP[
          data.role as keyof typeof ROUTES.ROLE_REDIRECT_MAP
        ];

      if (!redirectPath) {
        // alert("Role không hợp lệ");
        message.error(UI_TEXT.AUTH.INVALID_ROLE);
        return;
      }

      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      // alert(error?.response?.data?.message || "Email hoặc mật khẩu không đúng");
      message.error(UI_TEXT.AUTH.INCORRECT_EMAIL_PASSWORD);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <div className="login-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="logo-icon">
              <FaLock />
            </div>
            <h1 className="login-title">Chào mừng trở lại</h1>
            <p className="login-subtitle">Đăng nhập để tiếp tục</p>
            <p>admin@cinego.com / manager.hn@cinego.com / 123456</p>
          </div>

          {/* Form Fields */}
          <div className="login-form">
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="forgot-link">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`btn-submit ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>Hoặc đăng nhập với</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn google">
              <FaGoogle />
              <span>Google</span>
            </button>
            <button className="social-btn facebook">
              <FaFacebook />
              <span>Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="signup-text">
            Chưa có tài khoản?{" "}
            <a href="#" className="signup-link">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
