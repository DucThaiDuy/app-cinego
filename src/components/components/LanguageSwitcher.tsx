import { useTranslation } from "react-i18next";
import "./scss/LanguageSwitcher.scss";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isVI = i18n.language === "vi";

  const toggleLanguage = () => {
    i18n.changeLanguage(isVI ? "en" : "vi");
  };

  return (
    <div className="lang-switcher">
      <button className="switch-btn" onClick={toggleLanguage}>
        <span className="flag">
          <img
            src={
              isVI
                ? "https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                : "https://kenh14cdn.com/2017/5-1503128133747.png"
            }
            alt={isVI ? "VN" : "US"}
          />
        </span>
        <span className="text">{isVI ? "VI" : "EN"}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
