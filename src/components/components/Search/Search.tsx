import { useState } from "react";
import "./Search.scss";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const Search = ({
  placeholder = "Search movies...",
  onSearch,
}: SearchProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch?.(val);
  };

  const clearSearch = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className="cinema-search">
      <span className="icon">
        <IoSearch />
      </span>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {value && (
        <button className="clear-btn" onClick={clearSearch}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
