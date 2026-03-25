import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TicketBooking.tsx
import { useState } from "react";
import "./TicketBooking.scss";
const rows = ["A", "B", "C", "D", "E", "F"];
const seatsPerRow = 10;
const generateSeats = () => {
    const seats = [];
    rows.forEach((row) => {
        for (let i = 1; i <= seatsPerRow; i++) {
            seats.push({
                id: `${row}${i}`,
                row,
                number: i,
                status: Math.random() < 0.2 ? "booked" : "available",
            });
        }
    });
    return seats;
};
const formats = ["2D", "3D", "IMAX"];
const showtimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];
export default function TicketBooking() {
    const [seats, setSeats] = useState(generateSeats());
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState("2D");
    const [selectedShowtime, setSelectedShowtime] = useState("10:00");
    const toggleSeat = (seat) => {
        if (seat.status === "booked")
            return;
        if (seat.status === "selected") {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
            setSeats(seats.map((s) => (s.id === seat.id ? { ...s, status: "available" } : s)));
        }
        else {
            setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
            setSeats(seats.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s)));
        }
    };
    const totalPrice = selectedSeats.length * 75000;
    return (_jsxs("div", { className: "ticket-booking", children: [_jsxs("div", { className: "header", children: [_jsx("img", { src: "https://image.tmdb.org/t/p/w500/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg", alt: "poster", className: "poster" }), _jsxs("div", { className: "movie-info", children: [_jsx("h1", { children: "Mission: Impossible" }), _jsx("p", { children: "\u2B50 8.5 \u2022 148 ph\u00FAt" }), _jsx("p", { className: "description", children: "H\u00E0nh \u0111\u1ED9ng - Phi\u00EAu l\u01B0u - K\u1ECBch t\u00EDnh, \u0111\u1EC9nh cao c\u1EE7a Tom Cruise!" })] })] }), _jsxs("div", { className: "format-selection", children: [_jsx("h2", { children: "Ch\u1ECDn \u0111\u1ECBnh d\u1EA1ng" }), _jsx("div", { className: "format-list", children: formats.map((fmt) => (_jsx("button", { className: `format-btn ${selectedFormat === fmt ? "active" : ""}`, onClick: () => setSelectedFormat(fmt), children: fmt }, fmt))) })] }), _jsxs("div", { className: "showtime-selection", children: [_jsx("h2", { children: "Ch\u1ECDn su\u1EA5t chi\u1EBFu" }), _jsx("div", { className: "showtime-list", children: showtimes.map((time) => (_jsx("button", { className: `showtime-btn ${selectedShowtime === time ? "active" : ""}`, onClick: () => setSelectedShowtime(time), children: time }, time))) })] }), _jsxs("div", { className: "seat-selection", children: [_jsx("h2", { children: "Ch\u1ECDn gh\u1EBF" }), _jsx("div", { className: "screen", children: "M\u00C0N H\u00CCNH" }), _jsx("div", { className: "seats-grid", children: seats.map((seat) => (_jsx("div", { className: `seat ${seat.status}`, onClick: () => toggleSeat(seat), children: seat.id }, seat.id))) })] }), _jsxs("div", { className: "checkout", children: [_jsxs("p", { children: [_jsx("strong", { children: "\u0110\u1ECBnh d\u1EA1ng:" }), " ", selectedFormat, " |", " ", _jsx("strong", { children: "Su\u1EA5t chi\u1EBFu:" }), " ", selectedShowtime] }), _jsxs("p", { children: [_jsx("strong", { children: "Gh\u1EBF \u0111\u00E3 ch\u1ECDn:" }), " ", selectedSeats.map((s) => s.id).join(", ") || "Chưa chọn"] }), _jsxs("p", { children: [_jsx("strong", { children: "T\u1ED5ng ti\u1EC1n:" }), " ", totalPrice.toLocaleString(), " VND"] }), _jsx("button", { className: "book-btn", disabled: selectedSeats.length === 0, children: "\u0110\u1EB7t v\u00E9 ngay" })] })] }));
}
