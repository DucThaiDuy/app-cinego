import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./dashboard.scss";
export default function Dashboard() {
    return (_jsxs("div", { className: "dashboard", children: [_jsx("div", { className: "dashboard-header", children: _jsxs("div", { children: [_jsx("h1", { className: "dashboard-title", children: "Dashboard" }), _jsx("p", { className: "dashboard-subtitle", children: "T\u1ED5ng quan ho\u1EA1t \u0111\u1ED9ng r\u1EA1p h\u00F4m nay" })] }) }), _jsxs("div", { className: "stats", children: [_jsx(StatCard, { title: "Doanh thu h\u00F4m nay", value: "\u20AB5,200,000", icon: "\uD83D\uDCB0" }), _jsx(StatCard, { title: "V\u00E9 \u0111\u00E3 b\u00E1n", value: "320", icon: "\uD83C\uDF9F\uFE0F" }), _jsx(StatCard, { title: "Su\u1EA5t chi\u1EBFu h\u00F4m nay", value: "18", icon: "\uD83C\uDFAC" }), _jsx(StatCard, { title: "Booking ch\u1EDD x\u1EED l\u00FD", value: "12", icon: "\u23F3" })] }), _jsxs("div", { className: "dashboard-grid", children: [_jsxs("div", { className: "panel panel-large", children: [_jsx("h3", { children: "\uD83D\uDCC8 Doanh thu 7 ng\u00E0y g\u1EA7n nh\u1EA5t" }), _jsx(FakeChart, {})] }), _jsxs("div", { className: "panel", children: [_jsx("h3", { children: "\uD83C\uDFAC Su\u1EA5t chi\u1EBFu s\u1EAFp t\u1EDBi" }), _jsx(UpcomingShowtimes, {})] })] })] }));
}
/* ================= COMPONENTS ================= */
function StatCard({ title, value, icon, }) {
    return (_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-icon", children: icon }), _jsxs("div", { children: [_jsx("p", { className: "stat-title", children: title }), _jsx("h2", { className: "stat-value", children: value })] })] }));
}
function FakeChart() {
    return (_jsx("div", { className: "fake-chart", children: [40, 70, 55, 80, 60, 90, 65].map((h, i) => (_jsx("div", { style: { height: `${h}%` } }, i))) }));
}
function UpcomingShowtimes() {
    const data = [
        { movie: "Avengers", time: "14:30", hall: "Rạp 1" },
        { movie: "Dune 2", time: "16:00", hall: "Rạp 3" },
        { movie: "Godzilla x Kong", time: "18:45", hall: "IMAX" },
    ];
    return (_jsx("ul", { className: "showtime-list", children: data.map((item, index) => (_jsxs("li", { children: [_jsx("strong", { children: item.movie }), _jsxs("span", { children: [item.time, " \u2022 ", item.hall] })] }, index))) }));
}
