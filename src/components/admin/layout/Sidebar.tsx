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
  FaGift,
  FaUserTie,
  FaChartBar,
  FaNewspaper,
  FaMoneyCheckAlt,
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
              icon={<FaTachometerAlt />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.CINEMAS}`}
              label="Rạp phim"
              icon={<FaVideo />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.HALLS}`}
              label="Phòng chiếu"
              icon={<FaVideo />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.ADMIN.USERS}`}
              label="Người dùng"
              icon={<FaUsers />}
            />
          </>
        )}
        {/* Chỉ ADMIN */}
        {role === "MANAGER" && (
          <>
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.DASHBOARD}`}
              label="Dashboard"
              icon={<FaTachometerAlt />}
            />
            <NavItem to={`${basePath}/${ROUTES.MANAGER.MOVIES}`} label="Phim" icon={<FaFilm />} />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.GENRES}`}
              label="Thể loại"
              icon={<FaTags />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.ACTORS}`}
              label="Diễn viên"
              icon={<FaUserFriends />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.SHOWTIMES}`}
              label="Lịch chiếu"
              icon={<FaCalendarAlt />}
            />
            <NavItem
              to={`${basePath}/${ROUTES.MANAGER.BOOKINGS}`}
              label="Đặt vé"
              icon={<FaTicketAlt />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.FOOD}`}
              label="Bắp & Nước"
              icon={<FaHamburger />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.VOUCHERS}`}
              label="Khuyến mãi"
              icon={<FaGift />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.STAFF}`}
              label="Nhân viên"
              icon={<FaUserTie />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.REPORTS}`}
              label="Báo cáo"
              icon={<FaChartBar />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.NEWS}`}
              label="Tin tức"
              icon={<FaNewspaper />}
            />
             <NavItem
              to={`${basePath}/${ROUTES.MANAGER.PRICING}`}
              label="Bảng giá & Chính sách"
              icon={<FaMoneyCheckAlt />}
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
