import Nav from "../components/nav";
import "./home.scss";
import { useTranslation } from "react-i18next";
// import Showtime from "../components/Showtime/Showtime";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";

// import ArrowButton from "../components/ArrowButton/ArrowButton";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <Nav />

      {/* ===== HERO MOVIE ===== */}
      <section className="hero-movie">
        <div className="overlay" />
        <div className="hero-content">
          <h1>AVENGERS: ENDGAME</h1>
          <p>The ultimate cinematic experience on the big screen</p>
          <div className="hero-actions">
            <button className="btn-primary">{t("Book_Ticket")}</button>
            <button className="btn-outline">{t("Watch_Trailer")}</button>
          </div>
        </div>
      </section>

      {/* ===== SHOWTIME ===== */}
      <section className="showtime-section">{/* <Showtime /> */}</section>

      {/* ===== UPCOMING ===== */}
      <section className="main-section">
        <div className="main-header">
          <h2>{t("Featured_Movies")}</h2>

          <div className="main-tabs">
            <button className="active">{t("Now_Showing")}</button>
            <button>{t("Upcoming")}</button>
            <button>{t("Specials")}</button>
          </div>
        </div>

        <div className="movie-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="movie-item" key={i}>
              <div className="poster">
                <img
                  src="https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
                  alt="movie"
                />

                <span className="badge">PG-13</span>

                {/* HOVER ACTION */}
                <div className="poster-overlay">
                  <button className="btn-detail">{t("See_details")}</button>
                  <button className="btn-book">{t("Book_Now")}</button>
                </div>
              </div>

              <div className="info">
                <h3>Avengers: Endgame</h3>
                <p>Action • 181 min</p>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more">
          <button>
            {t("View_more")}
            <span>→</span>
          </button>
        </div>
      </section>

      <section className="event-section">
        <div className="section-header">
          <h2>{t("Featured_Events")}</h2>
          <button className="view-all">{t("View_all")}</button>
        </div>

        <div className="event-grid">
          <div
            className="event-card"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c)",
            }}
          >
            <div className="event-overlay" />
            <div className="event-content">
              <span className="tag hot">HOT</span>
              <h3>Tuần lễ phim bom tấn</h3>
              <p>Giảm đến 30% vé IMAX & 4DX</p>
              <button>Khám phá ngay</button>
            </div>
          </div>

          <div
            className="event-card"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4)",
            }}
          >
            <div className="event-overlay" />
            <div className="event-content">
              <span className="tag new">NEW</span>
              <h3>Ưu đãi thành viên</h3>
              <p>Tích điểm – đổi vé miễn phí</p>
              <button>{t("See_details")}</button>
            </div>
          </div>

          <div
            className="event-card"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1542204165-65bf26472b9b)",
            }}
          >
            <div className="event-overlay" />
            <div className="event-content">
              <span className="tag special">SPECIAL</span>
              <h3>Anime Night</h3>
              <p>Suất chiếu anime cuối tuần</p>
              <button>{t("Book_Now")}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECIAL FORMATS ===== */}
      {/* <section className="special-section">
        <div className="section-header">
          <h2>{t("Specials")}</h2>
        </div>

        <div className="special-grid">
          <div className="special-card imax">
            <span>IMAX</span>
            <p>Big Screen</p>
          </div>
          <div className="special-card d4x">
            <span>4DX</span>
            <p>Motion Seats</p>
          </div>
          <div className="special-card anime">
            <span>ANIME</span>
            <p>Japan Hits</p>
          </div>
          <div className="special-card concert">
            <span>CONCERT</span>
            <p>Live Shows</p>
          </div>
        </div>
      </section> */}
      {/* ===== BLOG SECTION ===== */}
      <section className="blog-section">
        <div className="blog-header">
          <h2>Movie Blog</h2>
          <button className="view-all">View all</button>
        </div>

        <div className="blog-content">
          {/* FEATURED BLOG */}
          <div className="blog-featured">
            <img
              src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
              alt="blog"
            />

            <div className="featured-overlay">
              <span className="tag">Review</span>
              <h3>Avengers: Endgame – The Ultimate Marvel Finale</h3>
              <p>
                A powerful ending that brought emotions, action and nostalgia
                together.
              </p>
              <button>Read More →</button>
            </div>
          </div>

          {/* BLOG LIST */}
          <div className="blog-list">
            {[1, 2, 3].map((i) => (
              <div className="blog-item" key={i}>
                <img
                  src="https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
                  alt="blog"
                />
                <div className="info">
                  <span>News • 5 mins read</span>
                  <h4>Top 10 Movies You Should Watch This Month</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="cinema-footer">
        {/* TOP */}
        <div className="footer-top">
          <h2 className="footer-logo">The Sigtahorcle</h2>

          <ul className="footer-nav">
            <li>Terms</li>
            <li>Lot Now</li>
            <li>Included</li>
            <li>Privacy Policy</li>
            <li>Features</li>
          </ul>

          <div className="footer-social">
            <span className="icon fb">
              <FacebookOutlinedIcon />
            </span>
            <span className="icon chat">
              <ChatOutlinedIcon />
            </span>
            <span className="icon calendar">
              <DateRangeOutlinedIcon />
            </span>
            <span className="icon ig">
              <SubscriptionsOutlinedIcon />
            </span>
          </div>
        </div>

        <div className="footer-divider" />

        {/* MIDDLE */}
        <div className="footer-middle">
          <div className="footer-col">
            <h4>Help Center</h4>
            <p>
              The vision provide your steps with hotlines, support and customer
              care links.
            </p>
            <a href="#">Learn more →</a>
          </div>

          <div className="footer-col">
            <h4>
              <span className="brand twitter">Twitter</span>
            </h4>
            <p>
              Real-time updates for premieres and cinematic events around the
              city.
            </p>
            <a href="#">Follow us →</a>
          </div>

          <div className="footer-col">
            <h4>
              <span className="brand insta">Instagram</span>
            </h4>
            <p>
              Stay inspired with exclusive scenes, trailers and
              behind-the-scenes shots.
            </p>
            <a href="#">Subscribe →</a>
          </div>
        </div>

        <div className="footer-divider" />

        {/* BOTTOM */}
        <div className="footer-bottom">
          <div className="newsletter">
            <h4>Bigger newsletter</h4>
            <p>
              Subscribe for movie releases, special formats and premium cinema
              experiences.
            </p>

            <div className="newsletter-form">
              <input placeholder="Enter your email" />
              <button>Sign up</button>
            </div>
          </div>

          <div className="subscription">
            <input placeholder="Subscription..." />
          </div>
        </div>

        <div className="copyright">
          © 2025 Cinema Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
