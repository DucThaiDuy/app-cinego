import React, { useState } from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SecurityIcon from "@mui/icons-material/Security";
import { Ticket, Gem } from "lucide-react";
import "./PriceManagement.scss";

const PriceManagement = () => {
  // Simulate permission state
  const [canEdit, setCanEdit] = useState(false);

  return (
    <div className="price-mgmt-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Bảng giá & Chính sách" },
        ]}
        action={
           <div className="permission-toggle">
              <button 
                className={`btn-toggle ${canEdit ? 'active' : ''}`}
                onClick={() => setCanEdit(!canEdit)}
              >
                 {canEdit ? <LockOpenIcon /> : <LockIcon />}
                 {canEdit ? "Đang mở khóa chỉnh sửa" : "Đang khóa (Chỉ xem)"}
              </button>
           </div>
        }
      />

      <div className="price-mgmt-container">
        {!canEdit && (
          <div className="permission-warning shadow-premium">
             <SecurityIcon />
             <div className="text">
                <h4>Chế độ chỉ xem</h4>
                <p>Bạn không có quyền thay đổi bảng giá. Vui lòng liên hệ Admin cấp cao để được cấp quyền <strong>EDIT_PRICING</strong>.</p>
             </div>
          </div>
        )}

        {/* ===== PRICING POLICY SECTION ===== */}
        <div className={`settings-section shadow-premium ${!canEdit ? 'disabled' : ''}`}>
           <div className="section-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ticket size={24} color="var(--admin-primary)" /> Chính sách giá vé (Base Price)
              </h3>
              <p>Giá vé cơ bản áp dụng cho từng loại phòng chiếu.</p>
           </div>
           
           <div className="pricing-grid">
              <div className="price-input-group">
                 <label>Standard Hall</label>
                 <div className="input-with-unit">
                    <input type="number" defaultValue={75000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
              <div className="price-input-group">
                 <label>VIP / Gold Hall</label>
                 <div className="input-with-unit">
                    <input type="number" defaultValue={110000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
              <div className="price-input-group">
                 <label>IMAX Hall</label>
                 <div className="input-with-unit">
                    <input type="number" defaultValue={150000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
           </div>

           <div className="surcharge-rules">
              <h4>Quy tắc phụ thu</h4>
              <div className="rule-item">
                 <label>Cuối tuần (T6 - CN)</label>
                 <div className="input-with-unit surcharge">
                    <span>+</span>
                    <input type="number" defaultValue={15000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
              <div className="rule-item">
                 <label>Ngày lễ (Public Holidays)</label>
                 <div className="input-with-unit surcharge">
                    <span>+</span>
                    <input type="number" defaultValue={30000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
           </div>
        </div>

        {/* ===== LOYALTY POINTS SECTION ===== */}
        <div className={`settings-section shadow-premium ${!canEdit ? 'disabled' : ''}`}>
           <div className="section-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gem size={24} color="#3b82f6" /> Chính sách điểm thưởng & Thành viên
              </h3>
              <p>Cấu hình tỷ lệ tích điểm và quy đổi điểm khi mua vé.</p>
           </div>

           <div className="point-rules">
              <div className="rule-item-inline">
                 <div className="info">
                    <label>Tỷ lệ tích lũy</label>
                    <p>Khách hàng nhận được % điểm trên tổng hóa đơn.</p>
                 </div>
                 <div className="input-with-unit point">
                    <input type="number" defaultValue={5} disabled={!canEdit} />
                    <span>%</span>
                 </div>
              </div>

              <div className="rule-item-inline">
                 <div className="info">
                    <label>Giá trị quy đổi</label>
                    <p>Số tiền tương ứng khi tiêu 1 điểm tích lũy.</p>
                 </div>
                 <div className="input-with-unit point">
                    <span>1 point = </span>
                    <input type="number" defaultValue={1000} disabled={!canEdit} />
                    <span>VND</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="settings-footer">
           <button className="btn-save-settings" disabled={!canEdit}>
              Cập nhật bảng giá
           </button>
        </div>
      </div>
    </div>
  );
};

export default PriceManagement;
