import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Showtime.scss";
const cinemas = [
    "Lotte Gò Vấp",
    "Lotte Thủ Đức",
    "Lotte Moonlight",
    "Lotte Phú Thọ",
    "Lotte Nowzone",
];
const dates = [
    { day: 18, label: "Hôm nay" },
    { day: 19, label: "Thứ 6" },
    { day: 20, label: "Thứ 7" },
    { day: 21, label: "Chủ nhật" },
    { day: 22, label: "Thứ 2" },
    { day: 23, label: "Thứ 3" },
    { day: 24, label: "Thứ 4" },
];
const times = ["08:25", "11:30", "13:50", "18:00", "22:20"];
const Showtime = () => {
    return (_jsx("section", { className: "showtime", children: _jsxs("div", { className: "showtime-wrapper", children: [_jsx("h2", { className: "showtime-title", children: "L\u1ECBch chi\u1EBFu phim Lotte Cinema" }), _jsxs("aside", { className: "cinema-list", children: [_jsxs("div", { className: "location", children: [_jsx("span", { children: "\uD83D\uDCCD H\u1ED3 Ch\u00ED Minh" }), _jsx("button", { children: "G\u1EA7n b\u1EA1n" })] }), _jsx("input", { type: "text", placeholder: "T\u00ECm theo t\u00EAn r\u1EA1p..." }), _jsx("ul", { className: "cinema-items", children: cinemas.map((cinema, index) => (_jsxs("li", { className: index === 0 ? "active" : "", children: [_jsx("img", { src: "/lotte-logo.png", alt: "Lotte Cinema" }), _jsx("span", { children: cinema })] }, cinema))) }), _jsx("button", { className: "more", children: "Xem th\u00EAm" })] }), _jsxs("div", { className: "showtime-content", children: [_jsxs("div", { className: "cinema-header", children: [_jsx("h3", { children: "L\u1ECBch chi\u1EBFu phim Lotte G\u00F2 V\u1EA5p" }), _jsxs("p", { children: ["T\u1EA7ng 3, Lotte Mart G\u00F2 V\u1EA5p \u2022 ", _jsx("span", { children: "B\u1EA3n \u0111\u1ED3" })] })] }), _jsx("div", { className: "date-tabs", children: dates.map((date, index) => (_jsxs("div", { className: `date ${index === 0 ? "active" : ""}`, children: [_jsx("strong", { children: date.day }), _jsx("span", { children: date.label })] }, date.day))) }), _jsxs("div", { className: "movie-showtime", children: [_jsx("img", { src: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", alt: "Vua C\u1EE7a C\u00E1c Vua" }), _jsxs("div", { className: "info", children: [_jsx("span", { className: "age", children: "13+" }), _jsx("h4", { children: "Vua C\u1EE7a C\u00E1c Vua" }), _jsx("p", { children: "Ho\u1EA1t h\u00ECnh \u2022 Ch\u00EDnh k\u1ECBch \u2022 Gi\u1EA3 t\u01B0\u1EDFng" }), _jsx("div", { className: "format", children: "2D L\u1ED3ng ti\u1EBFng" }), _jsx("div", { className: "times", children: times.map((time) => (_jsx("button", { children: time }, time))) })] })] })] })] }) }));
};
export default Showtime;
