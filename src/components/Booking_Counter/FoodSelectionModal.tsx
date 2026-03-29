import React, { useState, useEffect } from "react";
import "./FoodSelectionModal.scss";
import { X, Minus, Plus } from "lucide-react";

export type FoodItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "combo" | "popcorn" | "drink";
};

export type SelectedFood = FoodItem & {
  quantity: number;
};

// Mock data
const mockFoods: FoodItem[] = [
  {
    id: "c1",
    name: "Combo Sinh Viên (1 Bắp + 1 Nước + 1 Snack)",
    price: 89000,
    image: "https://homepage.momocdn.net/momo-upload-api/3563945037199990",
    type: "combo",
  },
  {
    id: "c2",
    name: "Combo Couple (1 Bắp lớn + 2 Nước vừa)",
    price: 129000,
    image: "https://homepage.momocdn.net/momo-upload-api/1801452627916962",
    type: "combo",
  },
  {
    id: "p1",
    name: "Bắp Ngọt Lớn",
    price: 59000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xNf9Xp0G5b_T_eZh7a-tG8DItJbN-G1vWA&s",
    type: "popcorn",
  },
  {
    id: "p2",
    name: "Bắp Phô Mai Lớn",
    price: 69000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xNf9Xp0G5b_T_eZh7a-tG8DItJbN-G1vWA&s",
    type: "popcorn",
  },
  {
    id: "d1",
    name: "Coca-Cola Lớn",
    price: 39000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lstb4gwe117282",
    type: "drink",
  },
  {
    id: "d2",
    name: "Sprite Lớn",
    price: 39000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lstb4gwe117282",
    type: "drink",
  },
];

interface FoodSelectionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (selectedFoods: SelectedFood[]) => void;
  initialSelectedFoods?: SelectedFood[];
}

export const FoodSelectionModal: React.FC<FoodSelectionModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  initialSelectedFoods = [],
}) => {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

  // Khởi tạo state từ danh sách cũ (nếu có nhấn lại để sửa)
  useEffect(() => {
    if (visible) {
      // Sao chép sâu để tránh lỗi tham chiếu
      setSelectedFoods(JSON.parse(JSON.stringify(initialSelectedFoods)));
    }
  }, [visible, initialSelectedFoods]);

  const handleUpdateQuantity = (food: FoodItem, delta: number) => {
    setSelectedFoods((prev) => {
      const existing = prev.find((f) => f.id === food.id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter((f) => f.id !== food.id);
        }
        return prev.map((f) =>
          f.id === food.id ? { ...f, quantity: newQuantity } : f
        );
      } else {
        if (delta > 0) {
          return [...prev, { ...food, quantity: 1 }];
        }
        return prev;
      }
    });
  };

  const getQuantity = (id: string) => {
    return selectedFoods.find((f) => f.id === id)?.quantity || 0;
  };

  const computeTotalPrice = () => {
    return selectedFoods.reduce((sum, f) => sum + f.price * f.quantity, 0);
  };

  if (!visible) return null;

  return (
    <div className="fsm-overlay" onClick={onCancel}>
      <div className="fsm-container" onClick={(e) => e.stopPropagation()}>
        <div className="fsm-header">
          <div>
            <h2>🍿 CHỌN ĐỒ ĂN / THỨC UỐNG</h2>
            <p className="fsm-subtitle">Thêm Combo giải khát cho buổi xem phim</p>
          </div>
          <button className="fsm-close-btn" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="fsm-body">
          <div className="fsm-grid">
            {mockFoods.map((food) => {
              const qty = getQuantity(food.id);
              return (
                <div key={food.id} className={`fsm-card ${qty > 0 ? "active" : ""}`}>
                  <div className="fsm-img-container">
                    <img src={food.image} alt={food.name} />
                  </div>
                  <div className="fsm-info">
                    <h3 className="fsm-food-name">{food.name}</h3>
                    <p className="fsm-food-price">{food.price.toLocaleString()}đ</p>
                    
                    <div className="fsm-quantity-wrapper">
                      {qty > 0 ? (
                        <>
                          <button
                            className="fsm-qty-btn fsm-qty-btn-minus"
                            onClick={() => handleUpdateQuantity(food, -1)}
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="fsm-qty-value">{qty}</span>
                          <button
                            className="fsm-qty-btn fsm-qty-btn-plus"
                            onClick={() => handleUpdateQuantity(food, 1)}
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="fsm-add-btn"
                          onClick={() => handleUpdateQuantity(food, 1)}
                        >
                          + Thêm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fsm-footer">
          <div className="fsm-footer-summary">
            <span>Tổng tạm tính:</span>
            <strong>{computeTotalPrice().toLocaleString()}đ</strong>
          </div>
          <div className="fsm-footer-actions">
            <button className="fsm-footer-btn-cancel" onClick={onCancel}>
              Đóng
            </button>
            <button
              className="fsm-footer-btn-confirm"
              onClick={() => onConfirm(selectedFoods)}
            >
              ✓ Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
