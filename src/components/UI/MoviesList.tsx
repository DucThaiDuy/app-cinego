// MoviesList.tsx (chỉ control nhỏ)
import React from "react";
import Pagination from "./Pagination";
import "./MoviesList.scss";

type MoviesListProps = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
};

const MoviesList: React.FC<MoviesListProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(parseInt(e.target.value));
  };

  return (
    <div className="movies-list">
      <div className="movies-list__controls">
        <label>
          Số item/trang:{" "}
          <select value={itemsPerPage} onChange={handleSelectChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        maxVisible={7}
      />
    </div>
  );
};

export default MoviesList;
