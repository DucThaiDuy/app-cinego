import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Pagination from "./Pagination";
import "./MoviesList.scss";
const MoviesList = ({ currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange, }) => {
    const handleSelectChange = (e) => {
        onItemsPerPageChange(parseInt(e.target.value));
    };
    return (_jsxs("div", { className: "movies-list", children: [_jsx("div", { className: "movies-list__controls", children: _jsxs("label", { children: ["S\u1ED1 item/trang:", " ", _jsxs("select", { value: itemsPerPage, onChange: handleSelectChange, children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] })] }) }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: onPageChange, maxVisible: 7 })] }));
};
export default MoviesList;
