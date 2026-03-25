import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SearchableSelect from "../../../UI/SearchableSelect/SearchableSelect";
import "./scss/add-showtime.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";
export default function AddShowtime() {
    const [movieId, setMovieId] = useState("");
    const movieOptions = [
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
        {
            value: 1,
            label: "Avengers: Endgame",
            image: "https://i.pravatar.cc/40?img=1",
        },
        {
            value: 2,
            label: "Avatar 2",
            image: "https://i.pravatar.cc/40?img=2",
        },
    ];
    const [form, setForm] = useState({
        movie_id: "",
        hall_id: "",
        show_date: "",
        show_time: "",
        format: "2D",
        language: "subtitle",
        status: "available",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const show_datetime = `${form.show_date} ${form.show_time}`;
        console.log({ ...form, show_datetime });
        alert("Thêm lịch chiếu thành công.");
        // alert("Tạo lịch chiếu thành công (mock)");
    };
    return (_jsxs("div", { className: "add-showtime-page", children: [_jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim", path: "/admin/movies" },
                    { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Thêm mới" },
                ] }), _jsxs("form", { className: "showtime-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83C\uDFAC Phim" }), _jsxs("select", { name: "movie_id", required: true, value: form.movie_id, onChange: handleChange, children: [_jsx("option", { value: "", children: "-- Ch\u1ECDn phim --" }), _jsx("option", { value: "1", children: "Avengers: Endgame" }), _jsx("option", { value: "2", children: "Dune Part Two" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83C\uDFE2 Ph\u00F2ng chi\u1EBFu" }), _jsx(SearchableSelect, { label: "", placeholder: "T\u00ECm phim...", options: movieOptions, value: movieId, onChange: (value) => setMovieId(value) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83D\uDCC5 Ng\u00E0y chi\u1EBFu" }), _jsx("input", { type: "date", name: "show_date", required: true, value: form.show_date, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\u23F0 Gi\u1EDD chi\u1EBFu" }), _jsx("input", { type: "time", name: "show_time", required: true, value: form.show_time, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83C\uDF9E \u0110\u1ECBnh d\u1EA1ng" }), _jsxs("select", { name: "format", value: form.format, onChange: handleChange, children: [_jsx("option", { value: "2D", children: "2D" }), _jsx("option", { value: "3D", children: "3D" }), _jsx("option", { value: "IMAX", children: "IMAX" }), _jsx("option", { value: "4DX", children: "4DX" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83C\uDF10 Ng\u00F4n ng\u1EEF" }), _jsxs("select", { name: "language", value: form.language, onChange: handleChange, children: [_jsx("option", { value: "subtitle", children: "Ph\u1EE5 \u0111\u1EC1" }), _jsx("option", { value: "dubbed", children: "L\u1ED3ng ti\u1EBFng" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\uD83D\uDCCC Tr\u1EA1ng th\u00E1i" }), _jsxs("select", { name: "status", value: form.status, onChange: handleChange, children: [_jsx("option", { value: "available", children: "C\u00F2n v\u00E9" }), _jsx("option", { value: "full", children: "H\u1EBFt v\u00E9" }), _jsx("option", { value: "cancelled", children: "H\u1EE7y" }), _jsx("option", { value: "ended", children: "\u0110\u00E3 chi\u1EBFu" })] })] }), _jsx("div", { className: "form-actions", children: _jsx("button", { type: "submit", className: "btn-primary", children: "\uD83D\uDCBE L\u01B0u l\u1ECBch chi\u1EBFu" }) })] })] }));
}
