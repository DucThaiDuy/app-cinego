import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import "./ArrowButton.scss";

interface ArrowButtonProps {
  to: string;
  label?: string;
}

const ArrowButton = ({ to, label = "Explore" }: ArrowButtonProps) => {
  const navigate = useNavigate();

  return (
    <button className="arrow-btn" onClick={() => navigate(to)}>
      <span className="text">{label}</span>
      <span className="icon">
        <IoArrowForward />
      </span>
    </button>
  );
};

export default ArrowButton;
