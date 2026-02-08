import { useState } from "react";
import "./floating-input.scss";

type InputProps = {
  label: string;
  name?: string;
  value?: string;
  required?: boolean;
  errorText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FloatingInput({
  label,
  name,
  value = "",
  required = false,
  errorText = "Trường này là bắt buộc",
  onChange,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isActive = focused || value.length > 0;
  const showError = required && touched && value.trim() === "";

  return (
    <div className={`input-field ${isActive ? "active" : ""}`}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
      />

      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>

      {showError && <div className="input-error">{errorText}</div>}
    </div>
  );
}
