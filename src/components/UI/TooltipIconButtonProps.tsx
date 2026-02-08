// TooltipIconButton.tsx
import React, { useState } from "react";
import "./tooltip-icon-button.scss";

type TooltipIconButtonProps = {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
  size?: number;
  color?: string; // màu icon động
  backgroundColor?: string; // màu nền button tùy chọn
};

const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
  title,
  onClick,
  children,
  size = 20,
  color = "#000",
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="tooltip-icon-button"
      style={{
        width: size,
        height: size,
        color: color,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {children}
      {hover && <div className="tooltip">{title}</div>}
    </div>
  );
};

export default TooltipIconButton;
