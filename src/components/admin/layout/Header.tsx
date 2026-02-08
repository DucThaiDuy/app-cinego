// Header.tsx
import { useState, useRef, useEffect } from "react";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./layout.scss";
import { authService } from "../../../api/service/auth.service";
import { useNavigate } from "react-router-dom";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { UI_TEXT } from "../../../constants/ui-text";
import { ROUTES } from "../../../constants/routes";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const message = useMessage();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { confirms, confirm, removeConfirm } = useConfirm();

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    confirm(
      UI_TEXT.CONFIRM.CONFIRM_ACTION,
      () => {
        try {
          // ✅ logout qua service
          authService.logout();

          // ✅ đóng dropdown (UX)
          setShowDropdown(false);

          // ✅ về trang login
          navigate(ROUTES.CLIENT.LOGIN, { replace: true });
        } catch (err: any) {
          // console.log(err.message);
          message.error(UI_TEXT.AUTH.LOGOUT_FAILED);
        }
      },
      {
        type: UI_TEXT.CONFIRM.TYPE_DANGER,
        title: UI_TEXT.CONFIRM.TITLE_LOGOUT,
        confirmText: UI_TEXT.CONFIRM.CONFIRMTEXT,
        cancelText: UI_TEXT.CONFIRM.CANCELTEXT,
      },
    );
  };

  return (
    <header className="admin-header">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />
      <div className="admin-header__left">
        <button className="admin-header__toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <span className="admin-header__title">Admin Dashboard</span>
      </div>

      <div className="admin-header__right">
        <div
          className="admin-user"
          onClick={() => setShowDropdown(!showDropdown)}
          ref={dropdownRef}
        >
          <img
            src="https://i.pinimg.com/736x/f3/0c/ab/f30cab06a4b29111703d7b3f333b0037.jpg"
            alt="admin"
          />
          <span>Admin</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`dropdown-arrow ${showDropdown ? "open" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="admin-dropdown">
              <a href="/admin/profile" className="dropdown-item">
                <span className="dropdown-icon">
                  <PersonSharpIcon />
                </span>
                <span>Thông tin cá nhân</span>
              </a>

              <a href="/admin/settings" className="dropdown-item">
                <span className="dropdown-icon">
                  <SettingsOutlinedIcon />
                </span>
                <span>Cài đặt</span>
              </a>

              <a href="/admin/activity-logs" className="dropdown-item">
                <span className="dropdown-icon">
                  <ManageHistoryOutlinedIcon />
                </span>
                <span>Lịch sử hoạt động</span>
              </a>

              <div className="dropdown-divider"></div>

              <a onClick={handleLogout} className="dropdown-item logout">
                <span className="dropdown-icon">
                  <LogoutRoundedIcon />
                </span>
                <span>Đăng xuất</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
