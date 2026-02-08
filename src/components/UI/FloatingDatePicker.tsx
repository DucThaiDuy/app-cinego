import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./FloatingDatePicker.scss";

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export default function FloatingDateField({ label, value, onChange }: Props) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!value;

  const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onFocus, onBlur }, ref) => (
      <input
        ref={ref}
        value={value}
        readOnly
        onClick={onClick}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
    )
  );

  return (
    <div className={`date-field ${active ? "active" : ""}`}>
      <div className="field-box">
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput />}
          portalId="root-portal"
        />

        <span className="icon">
          <FaCalendarAlt />
        </span>

        <label>{label}</label>
      </div>
    </div>
  );
}
