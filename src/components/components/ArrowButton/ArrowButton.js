import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import "./ArrowButton.scss";
const ArrowButton = ({ to, label = "Explore" }) => {
    const navigate = useNavigate();
    return (_jsxs("button", { className: "arrow-btn", onClick: () => navigate(to), children: [_jsx("span", { className: "text", children: label }), _jsx("span", { className: "icon", children: _jsx(IoArrowForward, {}) })] }));
};
export default ArrowButton;
