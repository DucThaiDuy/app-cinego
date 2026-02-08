import type { ChangeEvent } from "react";

export type InputFieldProps = {
  label?: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;

  textarea?: boolean;
  rows?: number;

  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  onBlur?: () => void;
};

export default function InputField({
  label,
  value,
  placeholder,
  type = "text",
  required,
  error,
  textarea,
  rows = 3,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div className={`input-field ${error ? "error" : ""}`}>
      {label && (
        <label>
          {label} {required && <span>*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={rows}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
