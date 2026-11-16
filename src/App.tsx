import { Routes, Route, Navigate } from "react-router-dom";

// Admin
import AdminBaseLayout from "./components/admin/layout/AdminBaseLayout";
import Dashboard from "./components/admin/pages/Dashboard";
import MovieManagement from "./components/admin/pages/MovieManagement";
import GenreManagement from "./components/admin/pages/GenreManagement";
import ActorManagement from "./components/admin/pages/ActorManagement";
import ShowtimeManagement from "./components/admin/pages/ShowtimeManagement";
import CinemaManagement from "./components/admin/pages/CinemaManagement";
import HallManagement from "./components/admin/pages/HallManagement";
import BookingPage from "./components/admin/pages/BookingPage";
import UserManagementPage from "./components/admin/pages/UserManagementPage";
import SettingsPage from "./components/admin/pages/SettingsPage";
import ProfilePage from "./components/admin/pages/ProfilePage";
import FoodManagement from "./components/admin/pages/FoodManagement";
import VoucherManagement from "./components/admin/pages/VoucherManagement";
import StaffManagement from "./components/admin/pages/StaffManagement";
import ReportPage from "./components/admin/pages/ReportPage";
import NewsManagement from "./components/admin/pages/NewsManagement";
import PriceManagement from "./components/admin/pages/PriceManagement";

// Add
import AddMovie from "./components/admin/pages/add/AddMovie";
import AddShowtime from "./components/admin/pages/add/AddShowtime";
import AddCinema from "./components/admin/pages/add/AddCinema";
import AddHall from "./components/admin/pages/add/AddHall";
import BookingAutoCheckin from "./components/admin/pages/add/BookingAutoCheckin";

// Client
import ClientLayout from "./components/home/layout/ClientLayout";
import Home from "./components/home/home";

// Booking
import BookingLayout from "./components/Booking_Counter/Layout/BookingLayout";
import BookingCounter from "./components/Booking_Counter/KioskBooking";
import TicketBooking from "./components/Booking_Counter/TicketBooking";
import { ENV } from "../env/env";
import { ROUTES } from "./constants/routes";
import LoginAdmin from "./components/admin/pages/login/LoginAdmin";
import RoleGuard from "./constants/RoleGuard";
import { authService } from "./api/service/auth.service";

// console.log("ENV CHECK =", ENV);

function App() {
  return (
    <Routes>
      {/* CLIENT */}
      <Route element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Route>

      <Route path={ROUTES.CLIENT.LOGIN} element={<LoginAdmin />} />
      
      {/* legacy redirect */}
      <Route
        path="/admin/bookings/auto-checkin"
        element={
          <Navigate
            to={`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}`}
            replace
          />
        }
      />

      {/* ADMIN */}
      <Route
        path={ROUTES.MANAGER.BASE}
        element={
          <RoleGuard allow={["MANAGER", "ADMIN"]}>
            <AdminBaseLayout 
              basePath={ROUTES.MANAGER.BASE} 
              role={authService.getAdminInfo().role || "MANAGER"} 
            />
          </RoleGuard>
        }
      >
        <Route
          index
          element={<Navigate to={ROUTES.MANAGER.DASHBOARD} replace />}
        />
        <Route path={ROUTES.MANAGER.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.MANAGER.MOVIES} element={<MovieManagement />} />
        <Route path={ROUTES.MANAGER.GENRES} element={<GenreManagement />} />
        <Route path={ROUTES.MANAGER.ACTORS} element={<ActorManagement />} />
        <Route
          path={ROUTES.MANAGER.SHOWTIMES}
          element={<ShowtimeManagement />}
        />
        <Route path={ROUTES.MANAGER.HALLS} element={<HallManagement />} />
        <Route path={ROUTES.MANAGER.BOOKINGS} element={<BookingPage />} />
        <Route path={ROUTES.MANAGER.FOOD} element={<FoodManagement />} />
        <Route path={ROUTES.MANAGER.VOUCHERS} element={<VoucherManagement />} />
        <Route path={ROUTES.MANAGER.STAFF} element={<StaffManagement />} />
        <Route path={ROUTES.MANAGER.REPORTS} element={<ReportPage />} />
        <Route path={ROUTES.MANAGER.NEWS} element={<NewsManagement />} />
        <Route path={ROUTES.MANAGER.PRICING} element={<PriceManagement />} />

        {/* Add */}
        <Route path={ROUTES.MANAGER.ADD_MOVIE} element={<AddMovie />} />
        <Route path={ROUTES.MANAGER.EDIT_MOVIE} element={<AddMovie />} />
        <Route path={ROUTES.MANAGER.ADD_SHOWTIME} element={<AddShowtime />} />
        <Route path={ROUTES.MANAGER.ADD_CINEMA} element={<AddCinema />} />
        <Route path={ROUTES.MANAGER.ADD_HALL} element={<AddHall />} />
        <Route path={ROUTES.MANAGER.EDIT_HALL} element={<AddHall />} />
        <Route
          path={ROUTES.MANAGER.ADD_BOOKING_AUTOCHECKIN}
          element={<BookingAutoCheckin />}
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path={ROUTES.ADMIN.BASE}
        element={
          <RoleGuard allow={["ADMIN"]}>
            <AdminBaseLayout basePath={ROUTES.ADMIN.BASE} role="ADMIN" />
          </RoleGuard>
        }
      >
        <Route
          index
          element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />}
        />
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.USERS} element={<UserManagementPage />} />
        <Route path={ROUTES.ADMIN.CINEMAS} element={<CinemaManagement />} />
        <Route path={ROUTES.ADMIN.HALLS} element={<HallManagement />} />
        <Route path={ROUTES.MANAGER.ADD_HALL} element={<AddHall />} />
        <Route path={ROUTES.MANAGER.EDIT_HALL} element={<AddHall />} />
        <Route path={ROUTES.ADMIN.SETTINGS} element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Booking Counter */}
      <Route path="/booking" element={<BookingLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<BookingCounter />} />
        <Route path="ticket-booking" element={<TicketBooking />} />
      </Route>

      {/* POS counter */}
      <Route path={ROUTES.POS_COUNTER.BASE} element={<BookingLayout />}>
        <Route index element={<BookingCounter />} />
        <Route path="home" element={<BookingCounter />} />
        <Route path="ticket-booking" element={<TicketBooking />} />
      </Route>

      {/* Direct POS paths */}
      <Route
        path={`${ROUTES.POS_COUNTER.BASE}/home`}
        element={<BookingCounter />}
      />
      <Route
        path={`${ROUTES.POS_COUNTER.BASE}/ticket-booking`}
        element={<TicketBooking />}
      />
    </Routes>
  );
}

export default App;
