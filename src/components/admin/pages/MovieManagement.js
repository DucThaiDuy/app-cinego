import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./MovieManagement.scss";
import { useNavigate } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import { useCallback, useEffect, useState } from "react";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PageHeader from "../../UI/PageHearder/PageHeader";
import Loading from "../../UI/loading/Loading";
import { adminmovieService } from "../../../api/service/movie.service";
export default function MovieManagement() {
    const navigate = useNavigate();
    // State
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    // Load movies
    const loadMovies = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminmovieService.fetchMovies({
                page: currentPage,
                limit: itemsPerPage,
            });
            if (!data)
                return;
            setMovies(data.items);
            setTotalItems(data.totalItems);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            console.log("Fetched movies:", data.items.length);
        }
        catch (err) {
            console.error("Load movies error:", err.message);
        }
        finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage]);
    // Effects
    useEffect(() => {
        loadMovies();
    }, [loadMovies]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, ageFilter, statusFilter]);
    // Handlers
    const handleDelete = (id) => {
        console.log("Delete movie:", id);
        alert("Delete clicked!");
    };
    const handleUpdate = (id) => {
        console.log("Update movie:", id);
        alert("Update clicked!");
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleItemsPerPageChange = (limit) => {
        setItemsPerPage(limit);
        setCurrentPage(1);
    };
    // Utils
    const getStatusLabel = (status) => {
        const labels = {
            NOW_SHOWING: "Đang chiếu",
            COMING_SOON: "Sắp chiếu",
            ENDED: "Ngừng chiếu",
        };
        return labels[status] || status;
    };
    const getStatusClass = (status) => {
        return status?.toLowerCase().replace(/_/g, "-") || "";
    };
    return (_jsxs("div", { className: "movie-page", children: [_jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => navigate("/admin/movies/add-movie"), children: "+ Th\u00EAm phim" }) }), _jsxs("div", { className: "movie-filters", children: [_jsx("input", { type: "text", placeholder: "\uD83D\uDD0D T\u00ECm theo t\u00EAn / slug / m\u00F4 t\u1EA3...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "filter-input" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "filter-select", children: [_jsx("option", { value: "ALL", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: "NOW_SHOWING", children: "\u0110ang chi\u1EBFu" }), _jsx("option", { value: "COMING_SOON", children: "S\u1EAFp chi\u1EBFu" }), _jsx("option", { value: "ENDED", children: "Ng\u1EEBng chi\u1EBFu" })] }), _jsxs("select", { value: ageFilter, onChange: (e) => setAgeFilter(e.target.value), className: "filter-select", children: [_jsx("option", { value: "ALL", children: "T\u1EA5t c\u1EA3 \u0111\u1ED9 tu\u1ED5i" }), _jsx("option", { value: "P", children: "P - Ph\u1ED5 bi\u1EBFn" }), _jsx("option", { value: "K", children: "K - Tr\u1EBB em" }), _jsx("option", { value: "T13", children: "T13 - 13+" }), _jsx("option", { value: "T16", children: "T16 - 16+" }), _jsx("option", { value: "T18", children: "T18 - 18+" }), _jsx("option", { value: "C", children: "C - C\u1EA5m chi\u1EBFu" })] })] }), _jsx("div", { className: "movie-table-wrapper", children: loading ? (_jsx(Loading, { text: "\u0110ang t\u1EA3i danh s\u00E1ch phim..." })) : (_jsxs("table", { className: "movie-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Phim" }), _jsx("th", { children: "Th\u1EDDi l\u01B0\u1EE3ng" }), _jsx("th", { children: "\u0110\u1ED9 tu\u1ED5i" }), _jsx("th", { children: "Rating" }), _jsx("th", { children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { children: "N\u1ED5i b\u1EADt" }), _jsx("th", { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx("tbody", { children: movies.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "empty-cell", children: "Kh\u00F4ng t\u00ECm th\u1EA5y phim n\u00E0o" }) })) : (movies.map((movie) => (_jsxs("tr", { children: [_jsx("td", { children: _jsxs("div", { className: "movie-info", children: [_jsx("img", { src: movie.posterUrl, alt: movie.title, className: "movie-poster" }), _jsxs("div", { className: "movie-details", children: [_jsx("h4", { className: "movie-title", children: movie.title }), _jsxs("div", { className: "movie-meta", children: [movie.originalTitle, " \u2022 ", movie.releaseDate] }), _jsxs("div", { className: "movie-extra", children: [movie.country, " \u2022 ", movie.distributor] })] })] }) }), _jsxs("td", { className: "duration", children: [movie.durationMinutes, " ph\u00FAt"] }), _jsx("td", { children: _jsx("span", { className: `age-badge age-${movie.ageRating}`, children: movie.ageRating }) }), _jsxs("td", { className: "rating", children: ["\u2B50 ", movie.rating] }), _jsx("td", { children: _jsx("span", { className: `status-badge ${getStatusClass(movie.status)}`, children: getStatusLabel(movie.status) }) }), _jsx("td", { className: "featured", children: movie.isFeatured ? "🔥" : "—" }), _jsx("td", { children: _jsxs("div", { className: "actions", children: [_jsx(TooltipIconButton, { title: "S\u1EEDa", onClick: () => handleUpdate(movie.id), size: 50, color: "#696969", children: _jsx(BorderColorIcon, { width: 20, height: 20 }) }), _jsx(TooltipIconButton, { title: "X\u00F3a", onClick: () => handleDelete(movie.id), size: 50, color: "#c52929ff", children: _jsx(DeleteIcon, { width: 20, height: 20 }) })] }) })] }, movie.id)))) })] })) }), !loading && movies.length > 0 && (_jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, itemsPerPage: itemsPerPage, onPageChange: handlePageChange, onItemsPerPageChange: handleItemsPerPageChange, itemsPerPageOptions: [10, 25, 50, 100], maxVisible: 3 }))] }));
}
