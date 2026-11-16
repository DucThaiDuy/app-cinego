import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import "./ClientLayout.scss";

export default function ClientLayout() {
  return (
    <div className="client-layout">
      <Nav />
      <main className="client-content">
        <Outlet />
      </main>
      <footer className="client-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="logo-text">CineGo</h2>
            <p>Bringing stories to life, one frame at a time.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li>Movies</li>
                <li>Cinemas</li>
                <li>Memberships</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CineGo Entertainment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
