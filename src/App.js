import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
// Admin
import AdminBaseLayout from "./components/admin/layout/AdminBaseLayout";
import Dashboard from "./components/admin/pages/Dashboard";
import MovieManagement from "./components/admin/pages/MovieManagement";
import GenreManagement from "./components/admin/pages/GenreManagement";
import ActorManagement from "./components/admin/pages/ActorManagement";
import ShowtimeManagement from "./components/admin/pages/ShowtimeManagement";
import CinemaManagement from "./components/admin/pages/CinemaManagement";
import BookingPage from "./components/admin/pages/BookingPage";
import UserManagementPage from "./components/admin/pages/UserManagementPage";
// Add
import AddMovie from "./components/admin/pages/add/AddMovie";
import AddShowtime from "./components/admin/pages/add/AddShowtime";
import AddCinema from "./components/admin/pages/add/AddCinema";
import BookingAutoCheckin from "./components/admin/pages/add/BookingAutoCheckin";
// Client
import ClientLayout from "./components/home/layout/ClientLayout";
import Home from "./components/home/home";
// Booking
import BookingLayout from "./components/Booking_Counter/Layout/BookingLayout";
import BookingCounter from "./components/Booking_Counter/KioskBooking";
import TicketBooking from "./components/Booking_Counter/TicketBooking";
import { ROUTES } from "./constants/routes";
import LoginAdmin from "./components/admin/pages/login/LoginAdmin";
import RoleGuard from "./constants/RoleGuard";
// console.log("ENV CHECK =", ENV);
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: ROUTES.CLIENT.LOGIN, replace: true }) }), _jsx(Route, { path: ROUTES.CLIENT.LOGIN, element: _jsx(LoginAdmin, {}) }), _jsx(Route, { path: "/admin/bookings/auto-checkin", element: _jsx(Navigate, { to: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`, replace: true }) }), _jsx(Route, { element: _jsx(ClientLayout, {}), children: _jsx(Route, { path: "/", element: _jsx(Home, {}) }) }), _jsxs(Route, { path: ROUTES.MANAGER.BASE, element: _jsx(RoleGuard, { allow: ["MANAGER"], children: _jsx(AdminBaseLayout, { basePath: ROUTES.MANAGER.BASE, role: "MANAGER" }) }), children: [_jsx(Route, { path: ROUTES.MANAGER.MOVIES, element: _jsx(MovieManagement, {}) }), _jsx(Route, { path: ROUTES.MANAGER.GENRES, element: _jsx(GenreManagement, {}) }), _jsx(Route, { path: ROUTES.MANAGER.ACTORS, element: _jsx(ActorManagement, {}) }), _jsx(Route, { path: ROUTES.MANAGER.SHOWTIMES, element: _jsx(ShowtimeManagement, {}) }), _jsx(Route, { path: ROUTES.MANAGER.BOOKINGS, element: _jsx(BookingPage, {}) }), _jsx(Route, { path: ROUTES.MANAGER.ADD_MOVIE, element: _jsx(AddMovie, {}) }), _jsx(Route, { path: ROUTES.MANAGER.ADD_SHOWTIME, element: _jsx(AddShowtime, {}) }), _jsx(Route, { path: ROUTES.MANAGER.ADD_CINEMA, element: _jsx(AddCinema, {}) }), _jsx(Route, { path: ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN, element: _jsx(BookingAutoCheckin, {}) })] }), _jsxs(Route, { path: ROUTES.ADMIN.BASE, element: _jsx(RoleGuard, { allow: ["ADMIN"], children: _jsx(AdminBaseLayout, { basePath: ROUTES.ADMIN.BASE, role: "ADMIN" }) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: ROUTES.ADMIN.DASHBOARD, replace: true }) }), _jsx(Route, { path: ROUTES.ADMIN.DASHBOARD, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: ROUTES.ADMIN.USERS, element: _jsx(UserManagementPage, {}) }), _jsx(Route, { path: ROUTES.ADMIN.CINEMAS, element: _jsx(CinemaManagement, {}) })] }), _jsxs(Route, { path: "/booking", element: _jsx(BookingLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "home", replace: true }) }), _jsx(Route, { path: "home", element: _jsx(BookingCounter, {}) }), _jsx(Route, { path: "ticket-booking", element: _jsx(TicketBooking, {}) })] }), _jsxs(Route, { path: ROUTES.POS_COUNTER.BASE, element: _jsx(BookingLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(BookingCounter, {}) }), _jsx(Route, { path: "home", element: _jsx(BookingCounter, {}) }), _jsx(Route, { path: "ticket-booking", element: _jsx(TicketBooking, {}) })] }), _jsx(Route, { path: `${ROUTES.POS_COUNTER.BASE}/home`, element: _jsx(BookingCounter, {}) }), _jsx(Route, { path: `${ROUTES.POS_COUNTER.BASE}/ticket-booking`, element: _jsx(TicketBooking, {}) })] }));
}
export default App;
