import React, { useState } from "react";
import "./floating-input-select.scss";

type Option = {
  label: string;
  value: string;
};

type FloatingSelectProps = {
  label: string;
  options: Option[];
  value?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  options,
  value = "",
  onChange,
  error,
  placeholder = "Chọn...",
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value !== "";

  return (
    <div className="floating-select">
      <div
        className={`floating-select__wrapper ${
          error ? "floating-select__wrapper--error" : ""
        }`}
      >
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`floating-select__input ${
            hasValue || isFocused ? "floating-select__input--filled" : ""
          }`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          className={`floating-select__label ${
            hasValue || isFocused ? "floating-select__label--float" : ""
          }`}
        >
          {label}
          {required && <span className="floating-select__required">*</span>}
        </label>

        <div className="floating-select__arrow">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <polyline
              points="6 9 12 15 18 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {error && (
          <div className="floating-select__error-icon">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="16"
                x2="12.01"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
      </div>

      {error && <p className="floating-select__error-message">{error}</p>}
    </div>
  );
};

export default FloatingSelect;
