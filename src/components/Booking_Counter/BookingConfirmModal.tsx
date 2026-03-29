import React, { useState, useEffect } from "react";
import "./BookingConfirmModal.scss";
import type { User } from "../../api/types/model/User.model";
import { Search, X, QrCode, Banknote, CreditCard, Trash2 } from "lucide-react";
import { FoodSelectionModal, SelectedFood } from "./FoodSelectionModal";
import { adminUserService } from "../../api/service/user.service";

interface BookingConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (
    customer: User | null,
    paymentMethod: "cash" | "vnpay" | "card",
    printTicket: boolean,
    emailTicket: boolean,
    emailAddress: string,
    comboPrice: number
  ) => void;
  movieInfo: {
    title: string;
    showtime: string;
    room: string;
    seats: string[];
    totalPrice: number;
    discount: number;
  };
}


export const BookingConfirmModal: React.FC<BookingConfirmModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  movieInfo,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  
  // Tùy chọn thanh toán
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "vnpay" | "card">("cash");
  
  // Các Tùy chọn 
  const [sendEmail, setSendEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [printTicket, setPrintTicket] = useState(true);

  // Focus ô tìm kiếm khi tìm thấy KH
  const [filteredCustomers, setFilteredCustomers] = useState<User[]>([]);

  // Đồ ăn thức uống
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

  // Xử lý tìm kiếm 
  useEffect(() => {
    if (searchTerm.trim() === "") {
        setFilteredCustomers([]);
        return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const term = searchTerm.trim();
        let filters = {};
        if (term.toUpperCase().startsWith("KH-") || term.toUpperCase().startsWith("KH")) {
            filters = { code: term };
        } else if (/^\d+$/.test(term)) {
            filters = { phone: term };
        } else if (term.includes("@")) {
            filters = { email: term };
        } else {
            filters = { fullName: term };
        }

        const response = await adminUserService.fetchUsers({ page: 1, limit: 10 }, filters);
        setFilteredCustomers(response.items || []);
      } catch (error) {
        console.error("Lỗi khi tìm user:", error);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectCustomer = (customer: User) => {
    setSelectedCustomer(customer);
    setSearchTerm("");
    setFilteredCustomers([]);
    if (customer.email) {
      setEmailAddress(customer.email);
      setSendEmail(true);
    }
  };

  const calculateFoodTotal = () => {
    return selectedFoods.reduce((sum, f) => sum + f.price * f.quantity, 0);
  };

  const calculateFinalPrice = () => {
    return movieInfo.totalPrice + calculateFoodTotal() - movieInfo.discount;
  };

  if (!visible) return null;

  return (
    <div className="bcm-overlay" onClick={onCancel}>
      <div className="bcm-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bcm-header">
          <div>
            <h2>XÁC NHẬN BÁN VÉ</h2>
            <p className="bcm-subtitle">
              {movieInfo.title} • {movieInfo.showtime} • {movieInfo.room} • Ghế: {movieInfo.seats.join(", ")}
            </p>
          </div>
          <button className="bcm-close-btn" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="bcm-body">
          {/* Customer Section */}
          <div className="bcm-section">
            <h3 className="bcm-section-title">KHÁCH HÀNG</h3>
            <div className="bcm-customer-search-row">
              <div className="bcm-search-input-wrapper">
                <Search size={18} className="bcm-search-icon" />
                <input
                  type="text"
                  placeholder="Tìm khách hàng qua tên hoặc SĐT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                {/* Dropdown search results */}
                {filteredCustomers.length > 0 && (
                    <div className="bcm-search-dropdown">
                        {filteredCustomers.map(c => (
                            <div key={c.id} className="bcm-search-item" onClick={() => handleSelectCustomer(c)}>
                                <b>{c.fullName || "Khách hàng"}</b> - {c.phone || "Không có SĐT"}
                            </div>
                        ))}
                    </div>
                )}
              </div>
              <button className="bcm-btn-primary">Tìm</button>
              {selectedCustomer ? (
                  <button 
                     className="bcm-btn-outline" 
                     onClick={() => setSelectedCustomer(null)} 
                     style={{ borderColor: '#d32f2f', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} /> Bỏ chọn
                  </button>
              ) : (
                  <button className="bcm-btn-outline">+ Tạo mới</button>
              )}
            </div>

            {selectedCustomer && (
              <div className="bcm-customer-card">
                <div className="bcm-cc-top">
                  <div className="bcm-cc-avatar">
                     {(selectedCustomer.fullName ?? "KH").substring(0,2).toUpperCase()}
                  </div>
                  <div className="bcm-cc-info">
                    <div className="bcm-cc-header-row">
                      <h4>{selectedCustomer.fullName}</h4>
                      {selectedCustomer.membershipTier === "GOLD" && (
                         <span className="bcm-badge bcm-badge-gold">Thành viên Vàng</span>
                      )}
                       {selectedCustomer.membershipTier === "SILVER" && (
                         <span className="bcm-badge bcm-badge-silver">Thành viên Bạc</span>
                      )}
                    </div>
                    <p className="bcm-cc-meta">
                      KH-00{selectedCustomer.id} • {selectedCustomer.phone} • {(selectedCustomer.email ?? "Chưa có email")}
                    </p>
                  </div>
                  <div className="bcm-cc-points">
                      <strong>{(selectedCustomer.totalPoints ?? 0).toLocaleString()} điểm</strong>
                      <p>Giảm 10%</p>
                  </div>
                </div>
                
                <div className="bcm-cc-stats">
                   <div className="bcm-stat">
                       <span>Tổng lần xem</span>
                       <strong>34 lần</strong>
                   </div>
                   <div className="bcm-stat">
                       <span>Lần xem gần nhất</span>
                       <strong>22/03/2026</strong>
                   </div>
                   <div className="bcm-stat">
                       <span>Ưu đãi</span>
                       <strong className="text-yellow">Giảm 10% hóa đơn</strong>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Food Section */}
          <div className="bcm-section">
            <div className="bcm-section-header-flex">
              <h3 className="bcm-section-title">🍕 ĐỒ ĂN MUA THÊM</h3>
              <button 
                 className="bcm-btn-outline-small"
                 onClick={() => setShowFoodModal(true)}
              >
                {selectedFoods.length > 0 ? "Thay đổi" : "+ Chọn đồ ăn"}
              </button>
            </div>
            {selectedFoods.length === 0 ? (
                <div className="bcm-food-placeholder">
                  <p>Chưa có đồ ăn nào được chọn</p>
                  <span>Nhấn "+ Chọn đồ ăn" để thêm</span>
                </div>
            ) : (
                <div className="bcm-food-list-display" style={{ background: '#232325', borderRadius: '8px', padding: '12px', border: '1px solid #333' }}>
                    {selectedFoods.map(f => (
                        <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                            <span style={{ color: '#fff' }}>{f.quantity}x {f.name}</span>
                            <span style={{ color: '#999' }}>{(f.price * f.quantity).toLocaleString()}đ</span>
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bcm-section bcm-bill-section">
             <h3 className="bcm-section-title">TỔNG HÓA ĐƠN</h3>
             <div className="bcm-bill-row">
                <span>Vé ({movieInfo.seats.join(", ")})</span>
                <span>{movieInfo.totalPrice.toLocaleString()}đ</span>
             </div>
             {selectedFoods.length > 0 && (
                <div className="bcm-bill-row">
                    <span>Đồ ăn/Thức uống</span>
                    <span>+{calculateFoodTotal().toLocaleString()}đ</span>
                </div>
             )}
             {movieInfo.discount > 0 && (
                <div className="bcm-bill-row bcm-text-green">
                    <span>Ưu đãi (10%)</span>
                    <span>-{movieInfo.discount.toLocaleString()}đ</span>
                </div>
             )}
             <hr className="bcm-divider" />
             <div className="bcm-bill-total">
                <span>Tổng thanh toán</span>
                <span>{calculateFinalPrice().toLocaleString()}đ</span>
             </div>
          </div>

          {/* Payment Method */}
          <div className="bcm-section">
            <h3 className="bcm-section-title">PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="bcm-payment-methods">
              <button 
                className={`bcm-pay-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <Banknote size={16} className="bcm-pay-icon" style={{color: paymentMethod === 'cash' ? '#32cd32' : 'gray'}} /> Tiền mặt
              </button>
              <button 
                className={`bcm-pay-btn ${paymentMethod === 'vnpay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('vnpay')}
              >
                <QrCode size={16} className="bcm-pay-icon" style={{color: paymentMethod === 'vnpay' ? '#00A1F0' : 'gray'}}/> VNPAY
              </button>
              <button 
                className={`bcm-pay-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={16} className="bcm-pay-icon" style={{color: paymentMethod === 'card' ? '#007FFF' : 'gray'}}/> Thẻ
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bcm-options-grid">
              <div className="bcm-option-card">
                 <div className="bcm-option-header">
                     <label className="bcm-checkbox-wrapper">
                         <span>✉️ Gửi vé qua Email</span>
                     </label>
                     <div className="bcm-toggle-switch">
                         <input type="checkbox" id="toggle-email" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)}/>
                         <label htmlFor="toggle-email"></label>
                     </div>
                 </div>
                 <div className="bcm-option-body">
                     <input 
                       type="email" 
                       className="bcm-input-dark" 
                       disabled={!sendEmail} 
                       value={emailAddress}
                       onChange={(e) => setEmailAddress(e.target.value)}
                       placeholder="Nhập email khách..." 
                     />
                     <p className="bcm-help-text">Kèm mã QR và thông tin suất chiếu</p>
                 </div>
              </div>

              <div className="bcm-option-card">
                 <div className="bcm-option-header">
                     <label className="bcm-checkbox-wrapper">
                         <span>🖨️ In vé tại quầy</span>
                     </label>
                     <div className="bcm-toggle-switch">
                         <input type="checkbox" id="toggle-print" checked={printTicket} onChange={(e) => setPrintTicket(e.target.checked)}/>
                         <label htmlFor="toggle-print"></label>
                     </div>
                 </div>
                 <div className="bcm-option-body">
                     <select className="bcm-input-dark" disabled={!printTicket}>
                         <option>Máy in quầy 1</option>
                         <option>Máy in quầy 2</option>
                     </select>
                     <p className="bcm-help-text">Vé nhiệt 80mm • Kèm mã QR</p>
                 </div>
              </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bcm-footer">
          <button className="bcm-footer-btn-cancel" onClick={onCancel}>Hủy</button>
          <button 
             className="bcm-footer-btn-confirm" 
             onClick={() => onConfirm(selectedCustomer, paymentMethod, printTicket, sendEmail, emailAddress, calculateFoodTotal())}
          >
            ✓ Xác nhận — {sendEmail ? "Gửi mail & In vé" : "In vé"}
          </button>
        </div>

      </div>

      <FoodSelectionModal 
         visible={showFoodModal}
         initialSelectedFoods={selectedFoods}
         onCancel={() => setShowFoodModal(false)}
         onConfirm={(foods) => {
             setSelectedFoods(foods);
             setShowFoodModal(false);
         }}
      />
    </div>
  );
};
