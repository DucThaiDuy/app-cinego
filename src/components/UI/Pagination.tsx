// Pagination.tsx
import "./Pagination.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (limit: number) => void;
  itemsPerPageOptions?: number[];
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  itemsPerPage = 10,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
}: PaginationProps) => {
  // Tính toán range của các trang hiển thị
  const getPageNumbers = () => {
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const showFirstPage = pages[0] > 1;
  const showLastPage = pages[pages.length - 1] < totalPages;

  return (
    <div className="pagination-wrapper">
      {/* Số item/trang */}
      {onItemsPerPageChange && (
        <div className="pagination-limit">
          <span className="pagination-limit__label">Số item/trang:</span>
          <select
            className="pagination-limit__select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pagination buttons */}
      <div className="pagination">
        <button
          type="button"
          className="pagination__btn pagination__btn--prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {showFirstPage && (
          <>
            <button
              type="button"
              className="pagination__number"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {pages[0] > 2 && <span className="pagination__dots">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`pagination__number ${
              currentPage === page ? "pagination__number--active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {showLastPage && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="pagination__dots">...</span>
            )}
            <button
              type="button"
              className="pagination__number"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          className="pagination__btn pagination__btn--next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
