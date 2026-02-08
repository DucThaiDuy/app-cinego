import "./Showtime.scss";

const cinemas = [
  "Lotte Gò Vấp",
  "Lotte Thủ Đức",
  "Lotte Moonlight",
  "Lotte Phú Thọ",
  "Lotte Nowzone",
];

const dates = [
  { day: 18, label: "Hôm nay" },
  { day: 19, label: "Thứ 6" },
  { day: 20, label: "Thứ 7" },
  { day: 21, label: "Chủ nhật" },
  { day: 22, label: "Thứ 2" },
  { day: 23, label: "Thứ 3" },
  { day: 24, label: "Thứ 4" },
];

const times = ["08:25", "11:30", "13:50", "18:00", "22:20"];

const Showtime = () => {
  return (
    <section className="showtime">
      <div className="showtime-wrapper">
        {/* ===== TITLE ===== */}
        <h2 className="showtime-title">Lịch chiếu phim Lotte Cinema</h2>

        {/* ===== SIDEBAR ===== */}
        <aside className="cinema-list">
          <div className="location">
            <span>📍 Hồ Chí Minh</span>
            <button>Gần bạn</button>
          </div>

          <input type="text" placeholder="Tìm theo tên rạp..." />

          <ul className="cinema-items">
            {cinemas.map((cinema, index) => (
              <li key={cinema} className={index === 0 ? "active" : ""}>
                <img src="/lotte-logo.png" alt="Lotte Cinema" />
                <span>{cinema}</span>
              </li>
            ))}
          </ul>

          <button className="more">Xem thêm</button>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <div className="showtime-content">
          {/* HEADER */}
          <div className="cinema-header">
            <h3>Lịch chiếu phim Lotte Gò Vấp</h3>
            <p>
              Tầng 3, Lotte Mart Gò Vấp • <span>Bản đồ</span>
            </p>
          </div>

          {/* DATE TABS */}
          <div className="date-tabs">
            {dates.map((date, index) => (
              <div
                key={date.day}
                className={`date ${index === 0 ? "active" : ""}`}
              >
                <strong>{date.day}</strong>
                <span>{date.label}</span>
              </div>
            ))}
          </div>

          {/* MOVIE SHOWTIME */}
          <div className="movie-showtime">
            <img
              src="https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
              alt="Vua Của Các Vua"
            />

            <div className="info">
              <span className="age">13+</span>

              <h4>Vua Của Các Vua</h4>
              <p>Hoạt hình • Chính kịch • Giả tưởng</p>

              <div className="format">2D Lồng tiếng</div>

              <div className="times">
                {times.map((time) => (
                  <button key={time}>{time}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showtime;
