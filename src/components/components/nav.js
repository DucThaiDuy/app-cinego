import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        }
        else {
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
    return (_jsx("nav", { className: "main-nav", children: _jsxs("div", { className: "nav-container", children: [_jsx("div", { className: "logo", children: _jsx(Link, { to: "/home", children: t("login_title") }) }), !isMobile && (_jsxs("ul", { className: "nav-links", children: [_jsx("li", { children: _jsx(Link, { to: "/home", children: t("home") }) }), _jsx("li", { children: _jsx("a", { href: "#", children: t("Now_Showing") }) }), _jsx("li", { children: _jsx("a", { href: "#", children: t("Upcoming") }) }), _jsxs("li", { className: "dropdown", onMouseEnter: () => setOpenSpecials(true), onMouseLeave: () => setOpenSpecials(false), children: [_jsxs("a", { href: "#", children: [t("Specials"), _jsx("span", { className: "arrow", children: "\u25BE" })] }), openSpecials && (_jsxs("ul", { className: "dropdown-menu", children: [_jsx("li", { children: _jsx("a", { href: "#", children: "IMAX" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "4DX" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Anime" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Concert" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Early Screening" }) })] }))] }), _jsx("li", { children: _jsx("a", { href: "#", children: t("Support") }) })] })), !isMobile && (_jsxs("div", { className: "nav-actions", children: [_jsx(LanguageSwitcher, {}), _jsxs("div", { className: "user-avatar", onClick: handleUserClick, children: [_jsx("img", { src: "https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/%E1%BA%A3nh%20s%C6%A1n%20t%C3%B9ng%20mtp/anh-son-tung-mtp-thumb.jpg", alt: "User" }), dropdownOpen && userInfo && (_jsxs("ul", { className: "user-dropdown", children: [_jsx("li", { children: _jsx(Link, { to: "/profile", onClick: () => setDropdownOpen(false), children: t("Profile") }) }), _jsx("li", { onClick: handleLogout, children: t("Logout") })] }))] })] })), isMobile && (_jsxs("div", { className: "nav-toggle", onClick: openCanvas, children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })), isMobile && (_jsx("div", { className: `canvas-overlay ${isCanvasOpen ? "show" : ""}`, onClick: closeCanvas })), isMobile && (_jsxs("div", { className: `mobile-canvas ${isCanvasOpen ? "open" : ""}`, children: [_jsxs("div", { className: "canvas-header", children: [_jsx("span", { children: t("menu") }), _jsx("button", { onClick: closeCanvas, children: "\u2715" })] }), _jsxs("ul", { className: "canvas-links", children: [_jsx("li", { children: _jsx(Link, { to: "/home", onClick: closeCanvas, children: t("home") }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Features" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Pricing" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "About" }) })] }), _jsxs("div", { className: "canvas-actions", children: [_jsx(LanguageSwitcher, {}), _jsxs("div", { className: "user-avatar", onClick: (e) => {
                                        e.stopPropagation();
                                        handleUserClick();
                                    }, children: [_jsx("img", { src: "https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/%E1%BA%A3nh%20s%C6%A1n%20t%C3%B9ng%20mtp/anh-son-tung-mtp-thumb.jpg", alt: "User" }), dropdownOpen && userInfo && (_jsxs("ul", { className: "user-dropdown", children: [_jsx("li", { children: _jsx(Link, { to: "/profile", onClick: () => setDropdownOpen(false), children: t("Profile") }) }), _jsx("li", { onClick: handleLogout, children: t("Logout") })] }))] })] })] }))] }) }));
};
export default Nav;
