import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TooltipIconButton.tsx
import { useState } from "react";
import "./tooltip-icon-button.scss";
const TooltipIconButton = ({ title, onClick, children, size = 20, color = "#000", }) => {
    const [hover, setHover] = useState(false);
    return (_jsxs("div", { className: "tooltip-icon-button", style: {
            width: size,
            height: size,
            color: color,
        }, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onClick: onClick, children: [children, hover && _jsx("div", { className: "tooltip", children: title })] }));
};
export default TooltipIconButton;
