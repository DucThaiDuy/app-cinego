type Option<T = string> = {
  label: string;
  value: T;
};

type SelectFieldProps<T = string> = {
  value: T;
  options: Option<T>[];
  required?: boolean;
  error?: string;
  onChange: (value: T) => void;
};

export default function SelectField<T extends string>({
  value,
  options,
  required,
  error,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <div className={`select-field ${error ? "error" : ""}`}>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
