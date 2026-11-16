import React from "react";
import "./ProfilePage.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Thông tin cá nhân" },
        ]}
      />

      <div className="profile-container">
        {/* Lớp cover phía trên (Ảnh bìa) */}
        <div className="profile-cover"></div>

        {/* Khối content chứa Avatar và Text */}
        <div className="profile-main-card">
          <div className="profile-avatar-wrapper">
            <img 
              src="https://i.pinimg.com/736x/f3/0c/ab/f30cab06a4b29111703d7b3f333b0037.jpg" 
              alt="Admin Avatar" 
              className="profile-avatar"
            />
            <div className="avatar-badge">Quản trị viên</div>
          </div>

          <div className="profile-info-header">
            <h1 className="profile-name">CineGo Admin</h1>
            <p className="profile-email">admin@cinego.vn</p>
          </div>

          <div className="profile-details-grid">
            <div className="detail-card">
              <span className="detail-label">Số điện thoại</span>
              <strong className="detail-value">+84 123 456 789</strong>
            </div>
            <div className="detail-card">
              <span className="detail-label">Khu vực làm việc</span>
              <strong className="detail-value">Cinema Hà Nội Center</strong>
            </div>
            <div className="detail-card">
              <span className="detail-label">Vai trò</span>
              <strong className="detail-value">MANAGER (Quản lý)</strong>
            </div>
            <div className="detail-card">
              <span className="detail-label">Trạng thái</span>
              <strong className="detail-value active-status">Đang hoạt động</strong>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-edit-profile">Cập nhật thông tin</button>
            <button className="btn-change-password">Đổi mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
