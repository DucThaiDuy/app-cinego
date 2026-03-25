import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import "./scss/LanguageSwitcher.scss";
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const isVI = i18n.language === "vi";
    const toggleLanguage = () => {
        i18n.changeLanguage(isVI ? "en" : "vi");
    };
    return (_jsx("div", { className: "lang-switcher", children: _jsxs("button", { className: "switch-btn", onClick: toggleLanguage, children: [_jsx("span", { className: "flag", children: _jsx("img", { src: isVI
                            ? "https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                            : "https://kenh14cdn.com/2017/5-1503128133747.png", alt: isVI ? "VN" : "US" }) }), _jsx("span", { className: "text", children: isVI ? "VI" : "EN" })] }) }));
};
export default LanguageSwitcher;
