import React, { useState } from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MOCK_NEWS } from "../../../api/service/mock/mockData";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import "./NewsManagement.scss";

const NewsManagement = () => {
  const [news] = useState(MOCK_NEWS);

  return (
    <div className="news-management">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Quản lý Tin tức & Banner" },
        ]}
        action={
          <button className="btn-add">
            <span>+</span> Đăng tin mới
          </button>
        }
      />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon"><NewspaperIcon /></div>
          <div className="stat-info">
            <span className="stat-label">Bản tin đã đăng</span>
            <span className="stat-value">{news.length}</span>
          </div>
        </div>
      </div>

      <div className="news-grid">
         {news.map(item => (
           <div key={item.id} className="news-card shadow-premium">
              <div className="news-image">
                 <img src={item.image} alt={item.title} />
                 <span className={`status-tag ${item.status.toLowerCase()}`}>
                    {item.status === "PUBLISHED" ? "Đã đăng" : "Bản nháp"}
                 </span>
              </div>
              <div className="news-body">
                 <h4>{item.title}</h4>
                 <p className="news-date">{item.date}</p>
                 <div className="news-actions">
                    <button className="btn-edit-flat"><EditIcon fontSize="inherit" /> Sửa</button>
                    <button className="btn-delete-flat"><DeleteIcon fontSize="inherit" /> Xóa</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default NewsManagement;
