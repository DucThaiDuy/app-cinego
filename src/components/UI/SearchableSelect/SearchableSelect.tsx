import { useEffect, useRef, useState } from "react";
import "./searchable-select.scss";

/* ===== TYPES ===== */
export type SelectOption = {
  value: string | number;
  label: string;
  image?: string;
};

export type SearchableSelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
};

/* ===== COMPONENT ===== */
export default function SearchableSelect({
  label,
  placeholder = "Chọn...",
  options,
  value,
  onChange,
}: SearchableSelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const selected = options.find((o) => o.value === value);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(keyword.toLowerCase())
  );

  /* close when click outside */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="searchable-select" ref={wrapperRef}>
      {label && <label>{label}</label>}

      <div
        className={`select-box ${open ? "open" : ""}`}
        onClick={() => setOpen(true)}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
        <i className="arrow" />
      </div>

      {open && (
        <div className="dropdown">
          <ul>
            {/* ===== SEARCH OPTION (FIRST ITEM) ===== */}
            <li className="search-option" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
              />
            </li>

            {filteredOptions.length === 0 && (
              <li className="empty">Không có dữ liệu</li>
            )}

            {filteredOptions.map((o) => (
              <li
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                  setKeyword("");
                }}
              >
                {o.image && <img src={o.image} />}
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
