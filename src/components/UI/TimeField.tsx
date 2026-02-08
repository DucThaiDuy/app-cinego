import React from "react";
import "./InputField.scss";

type TimeFieldProps = {
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TimeField: React.FC<TimeFieldProps> = ({
  value,
  placeholder = "--:--",
  error,
  required = false,
  onChange,
}) => {
  return (
    <div className="input-field">
      <div className="input-field__wrapper">
        <input
          type="time"
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`input-field__input ${
            error ? "input-field__input--error" : ""
          }`}
        />

        {/* {error && (
          <span className="input-field__icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        )} */}
      </div>

      {error && <p className="input-field__error">{error}</p>}
    </div>
  );
};

export default TimeField;
