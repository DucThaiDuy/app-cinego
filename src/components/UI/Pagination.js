import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Pagination.tsx
import "./Pagination.scss";
const Pagination = ({ currentPage, totalPages, onPageChange, maxVisible = 5, itemsPerPage = 10, onItemsPerPageChange, itemsPerPageOptions = [5, 10, 20, 50], }) => {
    // Tính toán range của các trang hiển thị
    const getPageNumbers = () => {
        const pages = [];
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
    return (_jsxs("div", { className: "pagination-wrapper", children: [onItemsPerPageChange && (_jsxs("div", { className: "pagination-limit", children: [_jsx("span", { className: "pagination-limit__label", children: "S\u1ED1 item/trang:" }), _jsx("select", { className: "pagination-limit__select", value: itemsPerPage, onChange: (e) => onItemsPerPageChange(Number(e.target.value)), children: itemsPerPageOptions.map((option) => (_jsx("option", { value: option, children: option }, option))) })] })), _jsxs("div", { className: "pagination", children: [_jsx("button", { type: "button", className: "pagination__btn pagination__btn--prev", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, children: "\u25C0" }), showFirstPage && (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: "pagination__number", onClick: () => onPageChange(1), children: "1" }), pages[0] > 2 && _jsx("span", { className: "pagination__dots", children: "..." })] })), pages.map((page) => (_jsx("button", { type: "button", className: `pagination__number ${currentPage === page ? "pagination__number--active" : ""}`, onClick: () => onPageChange(page), children: page }, page))), showLastPage && (_jsxs(_Fragment, { children: [pages[pages.length - 1] < totalPages - 1 && (_jsx("span", { className: "pagination__dots", children: "..." })), _jsx("button", { type: "button", className: "pagination__number", onClick: () => onPageChange(totalPages), children: totalPages })] })), _jsx("button", { type: "button", className: "pagination__btn pagination__btn--next", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: "\u25B6" })] })] }));
};
export default Pagination;
