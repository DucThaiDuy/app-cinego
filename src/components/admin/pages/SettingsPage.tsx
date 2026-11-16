import React from "react";
import "./SettingsPage.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { useTheme } from "../../../context/ThemeContext";
import { Settings, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="settings-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Cài đặt" },
        ]}
      />

      <div className="settings-container">
        <h2 className="settings-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={28} color="var(--admin-primary)" /> Cài đặt hệ thống
        </h2>
        
        {/* ===== THEME SECTION ===== */}
        <div className="settings-section shadow-premium">
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Giao diện người dùng</h3>
              <p>Chuyển đổi giữa chế độ Sáng (Light) và Tối (Dark) cho hệ thống Admin.</p>
            </div>
            <div className="settings-item-action">
              <button 
                className={`theme-toggle-btn ${theme === 'dark' ? 'dark' : 'light'}`} 
                onClick={toggleTheme}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}
              >
                {theme === 'dark' ? <><Moon size={18} /> Chế độ Tối</> : <><Sun size={18} /> Chế độ Sáng</>}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section shadow-premium">
           <div className="settings-item">
             <div className="settings-item-info">
               <h3>Thông tin rạp</h3>
               <p>Cập nhật thông tin liên hệ, hotline và địa chỉ trụ sở chính.</p>
             </div>
             <div className="settings-item-action">
                <button className="btn-edit-flat">Chỉnh sửa</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
