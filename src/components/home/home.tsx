import "./home.scss";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Home = () => {
  const { t } = useTranslation();

  const movies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action • 181 min", rating: "4.9", img: "8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" },
    { id: 2, title: "Black Widow", genre: "Action • 134 min", rating: "4.5", img: "7WsyChvgynooYst13uO9unS9m9u.jpg" },
    { id: 3, title: "Lion King", genre: "Adventure • 118 min", rating: "4.7", img: "pgqK0arqP7whcyu0puvv7DPh9j1.jpg" },
    { id: 4, title: "Joker", genre: "Drama • 122 min", rating: "4.8", img: "x6v867Sbeu66Q824pAs044pXovT.jpg" },
    { id: 5, title: "Avatar: Way of Water", genre: "Sci-Fi • 192 min", rating: "4.9", img: "rS8fFF46O05Yvbtm76Y899UId6v.jpg" },
    { id: 6, title: "Inception", genre: "Sci-Fi • 148 min", rating: "4.8", img: "u96v9vS6fUnm045VpZ7V9r5f5Yp.jpg" },
    { id: 7, title: "Titanic", genre: "Romance • 194 min", rating: "4.6", img: "1g0dhYmWy309S6vuh4AExSfy99o.jpg" },
    { id: 8, title: "Interstellar", genre: "Sci-Fi • 169 min", rating: "4.9", img: "vS95T03yUnm045VpZ7V9r5f5Yp.jpg" },
  ];

  return (
    <div className="home-page">
      {/* ===== HERO BANNER ===== */}
      <section className="hero-banner">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" alt="Hero" />
        </div>
        <div className="hero-content">
          <span className="hero-tag">NEW RELEASE</span>
          <h1>DUNE: PART TWO</h1>
          <p>Explore the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge.</p>
          <div className="btn-group">
            <button className="btn-book">
              <ConfirmationNumberIcon sx={{ mr: 1, fontSize: 20 }} />
              {t("Book_Ticket")}
            </button>
            <button className="btn-trailer">
              <PlayArrowIcon sx={{ mr: 1, fontSize: 24 }} />
              {t("Watch_Trailer")}
            </button>
          </div>
        </div>
      </section>

      {/* ===== MOVIES EXPLORER ===== */}
      <section className="section-container">
        <div className="section-header">
          <h2>Movies Now Playing</h2>
          <div className="filter-tabs">
            <span className="active">{t("Now_Showing")}</span>
            <span>{t("Upcoming")}</span>
            <span>Premier</span>
          </div>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt={movie.title} />
                <div className="rating-chip">
                  <StarIcon sx={{ fontSize: 14, mr: 0.5, mb: 0.2 }} />
                  {movie.rating}
                </div>
              </div>
              <h3>{movie.title}</h3>
              <div className="meta">{movie.genre}</div>
            </div>
          ))}
        </div>

        {/* ===== FEATURE BAR ===== */}
        <div className="info-bar">
          <div className="info-item">
            <div className="icon-box">
              <LocalMoviesIcon />
            </div>
            <div>
              <h4>Premium Experience</h4>
              <p>IMAX, 4DX, and Gold Class for ultimate comfort.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box">
              <CardGiftcardIcon />
            </div>
            <div>
              <h4>Membership & Offers</h4>
              <p>Earn points with every ticket purchase.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box">
              <HelpOutlineIcon />
            </div>
            <div>
              <h4>Support Center</h4>
              <p>We are here to help you 24/7 with any issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWS & BLOG ===== */}
      <section className="section-container" style={{ background: 'var(--bg-secondary)', marginBottom: '0' }}>
        <div className="section-header">
          <h2>Cinematic News</h2>
          <button style={{ background: 'none', color: 'var(--brand-color)', fontWeight: 600 }}>See all news</button>
        </div>
        <div className="movie-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
          {[1, 2].map(i => (
            <div key={i} className="news-card" style={{ background: 'var(--bg-card)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img src={i === 1 ? "https://images.unsplash.com/photo-1536440136628-849c177e76a1" : "https://images.unsplash.com/photo-1485846234645-a62644f84728"} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="News" />
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-color)', fontWeight: 600 }}>PROMOTION</span>
                <h4 style={{ fontSize: '1.2rem', margin: '12px 0' }}>{i === 1 ? "Double Points Weekend" : "Upcoming Anime Festival"}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Join our special event this weekend and get exclusive rewards.</p>
                <button style={{ color: '#fff', borderBottom: '1px solid var(--brand-color)', paddingBottom: '2px', fontSize: '0.9rem' }}>Read more</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
