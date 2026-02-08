// KioskBooking.tsx
import { useState } from "react";
import "./KioskBooking.scss";

/* ===== TYPES ===== */
type Movie = {
  id: number;
  title: string;
  poster: string;
  rating: number;
  duration: number;
  genres: string[];
  category: string;
  status: "now_showing" | "coming_soon";
};

/* ===== MOCK DATA ===== */
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Mission: Impossible",
    poster: "https://image.tmdb.org/t/p/w500/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
    rating: 8.5,
    duration: 148,
    genres: ["Hành động", "Phiêu lưu"],
    category: "action",
    status: "now_showing",
  },
  {
    id: 2,
    title: "The Conjuring 3",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    rating: 7.8,
    duration: 112,
    genres: ["Kinh dị", "Bí ẩn"],
    category: "horror",
    status: "now_showing",
  },
  {
    id: 3,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 9.2,
    duration: 180,
    genres: ["Drama", "Lịch sử"],
    category: "drama",
    status: "now_showing",
  },
  {
    id: 4,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    rating: 8.0,
    duration: 114,
    genres: ["Hài", "Phiêu lưu"],
    category: "comedy",
    status: "now_showing",
  },
  {
    id: 5,
    title: "Avatar 3",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    rating: 9.0,
    duration: 195,
    genres: ["Khoa học viễn tưởng", "Hành động"],
    category: "scifi",
    status: "coming_soon",
  },
  {
    id: 6,
    title: "The Notebook",
    poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    rating: 8.7,
    duration: 123,
    genres: ["Tình cảm", "Drama"],
    category: "romance",
    status: "coming_soon",
  },
];

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "action", label: "Hành động" },
  { id: "comedy", label: "Hài" },
  { id: "drama", label: "Tâm lý" },
  { id: "horror", label: "Kinh dị" },
  { id: "romance", label: "Tình cảm" },
  { id: "scifi", label: "Khoa học viễn tưởng" },
];

/* ===== COMPONENT ===== */
export default function KioskBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter movies
  const filteredMovies = mockMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || movie.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const nowShowing = filteredMovies.filter((m) => m.status === "now_showing");
  const comingSoon = filteredMovies.filter((m) => m.status === "coming_soon");

  const handleBooking = (movie: Movie) => {
    alert(`Đang chuyển đến trang đặt vé cho: ${movie.title}`);
  };

  return (
    <div className="kiosk-booking">
      {/* Header */}
      <div className="kiosk-header">
        <h1>🎬 Đặt Vé Xem Phim</h1>
        <p>Chạm để chọn phim yêu thích và đặt vé ngay</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Now Showing */}
      {nowShowing.length > 0 && (
        <div className="movies-section">
          <h2 className="section-title">🔥 Đang chiếu</h2>
          <div className="movies-grid">
            {nowShowing.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onBook={handleBooking} />
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <div className="movies-section">
          <h2 className="section-title">🎯 Sắp chiếu</h2>
          <div className="movies-grid">
            {comingSoon.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onBook={handleBooking} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMovies.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy phim nào</p>
        </div>
      )}
    </div>
  );
}

/* ===== MOVIE CARD COMPONENT ===== */
type MovieCardProps = {
  movie: Movie;
  onBook: (movie: Movie) => void;
};

function MovieCard({ movie, onBook }: MovieCardProps) {
  return (
    <div className="movie-card" onClick={() => onBook(movie)}>
      <div className="movie-poster-wrapper">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-overlay">
          <button className="book-btn">Đặt vé ngay</button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span>•</span>
          <span>{movie.duration} phút</span>
        </div>
        <div className="genre-tags">
          {movie.genres.map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
