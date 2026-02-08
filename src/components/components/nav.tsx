import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import "./scss/Nav.scss";

const Nav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* ===== Detect mobile ===== */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Khi lên desktop → đóng canvas
      if (!mobile) {
        setIsCanvasOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===== User ===== */
  const userInfo = "DuyDuc"; // null = chưa login

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUserClick = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/home");
  };

  /* ===== Off-canvas ===== */
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  const openCanvas = () => setIsCanvasOpen(true);
  const closeCanvas = () => setIsCanvasOpen(false);

  // const handleMobileUserClick = () => {
  //   closeCanvas();
  //   handleUserClick();
  // };

  // Dropdown Specials
  const [openSpecials, setOpenSpecials] = useState(false);

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/home">{t("login_title")}</Link>
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <ul className="nav-links">
            <li>
              <Link to="/home">{t("home")}</Link>
            </li>

            <li>
              <a href="#">{t("Now_Showing")}</a>
            </li>

            <li>
              <a href="#">{t("Upcoming")}</a>
            </li>

            {/* SPECIALS DROPDOWN */}
            <li
              className="dropdown"
              onMouseEnter={() => setOpenSpecials(true)}
              onMouseLeave={() => setOpenSpecials(false)}
            >
              <a href="#">
                {t("Specials")}
                <span className="arrow">▾</span>
              </a>

              {openSpecials && (
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">IMAX</a>
                  </li>
                  <li>
                    <a href="#">4DX</a>
                  </li>
                  <li>
                    <a href="#">Anime</a>
                  </li>
                  <li>
                    <a href="#">Concert</a>
                  </li>
                  <li>
                    <a href="#">Early Screening</a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="#">{t("Support")}</a>
            </li>
          </ul>
        )}

        {/* Desktop actions */}
        {!isMobile && (
          <div className="nav-actions">
            <LanguageSwitcher />

            <div className="user-avatar" onClick={handleUserClick}>
              <img
                src="https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/%E1%BA%A3nh%20s%C6%A1n%20t%C3%B9ng%20mtp/anh-son-tung-mtp-thumb.jpg"
                alt="User"
              />

              {dropdownOpen && userInfo && (
                <ul className="user-dropdown">
                  <li>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                      {t("Profile")}
                    </Link>
                  </li>
                  <li onClick={handleLogout}>{t("Logout")}</li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <div className="nav-toggle" onClick={openCanvas}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {/* Overlay */}
        {isMobile && (
          <div
            className={`canvas-overlay ${isCanvasOpen ? "show" : ""}`}
            onClick={closeCanvas}
          />
        )}

        {/* Off-canvas */}
        {isMobile && (
          <div className={`mobile-canvas ${isCanvasOpen ? "open" : ""}`}>
            <div className="canvas-header">
              <span>{t("menu")}</span>
              <button onClick={closeCanvas}>✕</button>
            </div>

            <ul className="canvas-links">
              <li>
                <Link to="/home" onClick={closeCanvas}>
                  {t("home")}
                </Link>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>

            <div className="canvas-actions">
              <LanguageSwitcher />

              <div
                className="user-avatar"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserClick();
                }}
              >
                <img
                  src="https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/%E1%BA%A3nh%20s%C6%A1n%20t%C3%B9ng%20mtp/anh-son-tung-mtp-thumb.jpg"
                  alt="User"
                />

                {dropdownOpen && userInfo && (
                  <ul className="user-dropdown">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t("Profile")}
                      </Link>
                    </li>
                    <li onClick={handleLogout}>{t("Logout")}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
