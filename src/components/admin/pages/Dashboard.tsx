import "./dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Tổng quan hoạt động rạp hôm nay</p>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="stats">
        <StatCard title="Doanh thu hôm nay" value="₫5,200,000" icon="💰" />
        <StatCard title="Vé đã bán" value="320" icon="🎟️" />
        <StatCard title="Suất chiếu hôm nay" value="18" icon="🎬" />
        <StatCard title="Booking chờ xử lý" value="12" icon="⏳" />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="dashboard-grid">
        <div className="panel panel-large">
          <h3>📈 Doanh thu 7 ngày gần nhất</h3>
          <FakeChart />
        </div>

        <div className="panel">
          <h3>🎬 Suất chiếu sắp tới</h3>
          <UpcomingShowtimes />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
      </div>
    </div>
  );
}

function FakeChart() {
  return (
    <div className="fake-chart">
      {[40, 70, 55, 80, 60, 90, 65].map((h, i) => (
        <div key={i} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function UpcomingShowtimes() {
  const data = [
    { movie: "Avengers", time: "14:30", hall: "Rạp 1" },
    { movie: "Dune 2", time: "16:00", hall: "Rạp 3" },
    { movie: "Godzilla x Kong", time: "18:45", hall: "IMAX" },
  ];

  return (
    <ul className="showtime-list">
      {data.map((item, index) => (
        <li key={index}>
          <strong>{item.movie}</strong>
          <span>
            {item.time} • {item.hall}
          </span>
        </li>
      ))}
    </ul>
  );
}
