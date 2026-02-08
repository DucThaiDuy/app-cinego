import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFilm,
  FaTags,
  FaUserFriends,
  FaCalendarAlt,
  FaTicketAlt,
  FaHamburger,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { ROUTES } from "../../../constants/routes";

type Role = "ADMIN" | "MANAGER";

type SidebarProps = {
  isOpen: boolean;
  basePath: string;
  role: Role;
};

export default function Sidebar({ isOpen, basePath, role }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar__logo">
        <LocalMoviesIcon className="sidebar__logo-icon" />
        <span className="sidebar__logo-text">CineGo</span>
      </div>
      <nav className="sidebar__menu">
        {/* Dashboard: cả 2 đều thấy */}
        {role === "ADMIN" && (
          <>
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.DASHBOARD}`}
              label="Dashboard"
            />
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.CINEMAS}`}
              label="Rạp phim"
            />
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.USERS}`}
              label="Người dùng"
            />
          </>
        )}
        {/* Chỉ ADMIN */}
        {role === "MANAGER" && (
          <>
            <NavItem to={`${basePath}/${ROUTES.MANAGER.MOVIES}`} label="Phim" />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.GENRES}`}
              label="Thể loại"
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.ACTORS}`}
              label="Diễn viên"
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.SHOWTIMES}`}
              label="Lịch chiếu"
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.BOOKINGS}`}
              label="Đặt vé"
            />
          </>
        )}
      </nav>
    </aside>
  );
}

type NavItemProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

function NavItem({ to, label, icon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `sidebar__item${isActive ? " active" : ""}`}
    >
      {icon && <span className="sidebar__icon">{icon}</span>}
      <span className="sidebar__label">{label}</span>
    </NavLink>
  );
}
