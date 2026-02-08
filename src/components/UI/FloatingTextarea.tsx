import "./floating-textarea.scss";
import { useState } from "react";

type Props = {
  label: string;
  name?: string;
  value?: string;
  required?: boolean;
  errorText?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

export default function FloatingTextarea({
  label,
  name,
  value = "",
  required = false,
  errorText = "Trường này là bắt buộc",
  onChange,
  rows = 4,
}: Props) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isActive = focused || value.length > 0;
  const showError = required && touched && value.trim() === "";

  return (
    <div className={`input-field ${isActive ? "active" : ""}`}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        rows={rows}
      />
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>

      {showError && <div className="input-error">{errorText}</div>}
    </div>
  );
}
