import React from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { TrendingUp, Clapperboard, Film, Ticket } from "lucide-react";
import "./ReportPage.scss";

const ReportPage = () => {
  return (
    <div className="report-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Báo cáo & Thống kê" },
        ]}
        action={
          <button className="btn-export">
            <FileDownloadIcon /> Xuất báo cáo (Excel)
          </button>
        }
      />

      <div className="report-filter shadow-premium">
         <div className="filter-item">
            <label>Từ ngày</label>
            <input type="date" defaultValue="2026-04-01" />
         </div>
         <div className="filter-item">
            <label>Đến ngày</label>
            <input type="date" defaultValue="2026-04-30" />
         </div>
         <button className="btn-apply">Lọc dữ liệu</button>
      </div>

      <div className="report-grid">
         <div className="report-card panel shadow-premium">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="#dc2626" /> Doanh thu theo ngày
            </h3>
            <div className="mock-chart bar-chart">
               {[40, 60, 45, 90, 65, 85, 70].map((h, i) => (
                 <div key={i} className="bar" style={{ height: `${h}%` }}>
                    <span className="tooltip">{h}%</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="report-card panel shadow-premium">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clapperboard size={20} color="#3b82f6" /> Tỷ lệ lấp đầy phòng chiếu
            </h3>
            <div className="mock-chart pie-chart-placeholder">
               <div className="pie-ring">
                  <span className="percentage">68%</span>
               </div>
               <div className="pie-legend">
                  <p><span className="dot standard"></span> Vé đã bán</p>
                  <p><span className="dot empty"></span> Ghế trống</p>
               </div>
            </div>
         </div>
      </div>

      <div className="top-movies shadow-premium">
         <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
           <Film size={20} color="#f59e0b" /> Top phim doanh thu cao nhất
         </h3>
         <table className="modern-table">
            <thead>
               <tr>
                  <th>Hạng</th>
                  <th>Phim</th>
                  <th>Số vé</th>
                  <th>Doanh thu</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>1</td>
                  <td><strong>Avengers: Endgame</strong></td>
                  <td>1,250</td>
                  <td>125,000,000 đ</td>
               </tr>
               <tr>
                  <td>2</td>
                  <td><strong>Dune: Part Two</strong></td>
                  <td>980</td>
                  <td>98,000,000 đ</td>
               </tr>
               <tr>
                  <td>3</td>
                  <td><strong>Exhuma: Quật Mộ Trùng Tang</strong></td>
                  <td>850</td>
                  <td>85,000,000 đ</td>
               </tr>
            </tbody>
         </table>
      </div>

      <div className="voucher-stats shadow-premium">
         <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
           <Ticket size={20} color="#10b981" /> Thống kê Khuyến mãi được dùng nhiều nhất
         </h3>
         <div className="voucher-bars">
            <div className="voucher-bar-item">
               <div className="label">
                  <span>CINEGO20</span>
                  <span>458 lượt dùng</span>
               </div>
               <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
               </div>
            </div>
            <div className="voucher-bar-item">
               <div className="label">
                  <span>CHAOBANMOI</span>
                  <span>210 lượt dùng</span>
               </div>
               <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '45%' }}></div>
               </div>
            </div>
            <div className="voucher-bar-item">
               <div className="label">
                  <span>SUMMER2026</span>
                  <span>145 lượt dùng</span>
               </div>
               <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '30%' }}></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReportPage;
