import { 
  CircleDollarSign, 
  Popcorn, 
  Ticket, 
  Gift, 
  TrendingUp, 
  Clapperboard 
} from "lucide-react";
import { ReactNode } from "react";
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
        <StatCard 
          title="Doanh thu vé hôm nay" 
          value="₫5,200,000" 
          icon={<CircleDollarSign size={28} color="#eab308" />} 
        />
        <StatCard 
          title="Doanh thu bắp nước" 
          value="₫1,850,000" 
          icon={<Popcorn size={28} color="#f43f5e" />} 
        />
        <StatCard 
          title="Vé đã bán" 
          value="320" 
          icon={<Ticket size={28} color="#3b82f6" />} 
        />
        <StatCard 
          title="Khuyến mãi đang chạy" 
          value="5" 
          icon={<Gift size={28} color="#10b981" />} 
        />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="dashboard-grid">
        <div className="panel panel-large">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#dc2626" /> Doanh thu 7 ngày gần nhất
          </h3>
          <FakeChart />
        </div>

        <div className="panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clapperboard size={20} color="#3b82f6" /> Suất chiếu sắp tới
          </h3>
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
  icon: ReactNode;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
        {icon}
      </div>
      <div>
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
      </div>
    </div>
  );
}

function FakeChart() {
  const data = [120, 250, 180, 420, 310, 520, 440];
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const maxVal = 600;

  return (
    <div className="chart-container">
      <div className="chart-y-axis">
        <span>600k</span>
        <span>400k</span>
        <span>200k</span>
        <span>0</span>
      </div>
      <div className="chart-bars">
        {data.map((val, i) => (
          <div key={i} className="bar-wrapper">
             <div className="bar-tooltip">₫{val}k</div>
             <div 
               className="bar-fill" 
               style={{ height: `${(val / maxVal) * 100}%` }} 
             />
             <span className="bar-label">{days[i]}</span>
          </div>
        ))}
      </div>
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
