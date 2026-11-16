
export const MOCK_FOOD = [
  { id: 1, name: "Bắp rang bơ (S)", category: "Bắp", price: 35000, status: "AVAILABLE", image: "https://vcdn1-giaitri.vnecdn.net/2023/07/21/popcorn-1-1689914444.jpg" },
  { id: 2, name: "Bắp rang bơ (L)", category: "Bắp", price: 55000, status: "AVAILABLE", image: "https://vcdn1-giaitri.vnecdn.net/2023/07/21/popcorn-1-1689914444.jpg" },
  { id: 3, name: "Coca-Cola (L)", category: "Nước", price: 29000, status: "AVAILABLE", image: "https://m.media-amazon.com/images/I/5176rI20SdL.jpg" },
  { id: 4, name: "Combo Solo", category: "Combo", price: 89000, status: "AVAILABLE", image: "https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/m/y/my-combo_1.png" },
  { id: 5, name: "Combo Couple", category: "Combo", price: 129000, status: "AVAILABLE", image: "https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/g/cgv_combo_1.png" },
];

export const MOCK_VOUCHERS = [
  { id: 1, code: "CINEGO20", description: "Giảm 20% tổng bill", discountType: "PERCENTAGE", value: 20, maxDiscount: 50000, expiryDate: "2026-12-31", status: "ACTIVE" },
  { id: 2, code: "CHAOBANMOI", description: "Giảm 50k cho khách mới", discountType: "FIXED", value: 50000, maxDiscount: 50000, expiryDate: "2026-06-30", status: "ACTIVE" },
  { id: 3, code: "SUMMER2026", description: "Đồng giá vé 45k", discountType: "FIXED_PRICE", value: 45000, maxDiscount: 0, expiryDate: "2026-08-31", status: "EXPIRED" },
];

export const MOCK_STAFF = [
  { id: 1, fullName: "Nguyễn Văn A", email: "vana@cinego.vn", role: "MANAGER", cinema: "CineGo Hùng Vương", status: "ACTIVE" },
  { id: 2, fullName: "Lê Thị B", email: "thib@cinego.vn", role: "STAFF", cinema: "CineGo Hùng Vương", status: "ACTIVE" },
  { id: 3, fullName: "Trần Văn C", email: "vanc@cinego.vn", role: "STAFF", cinema: "CineGo Quận 7", status: "INACTIVE" },
];

export const MOCK_NEWS = [
  { id: 1, title: "Khai trương cụm rạp thứ 10 tại Hà Nội", image: "https://cinestar.com.vn/media/wysiwyg/tintuc/khaitruong.jpg", date: "2026-04-01", status: "PUBLISHED" },
  { id: 2, title: "Siêu ưu đãi ngày thứ 2 đầu tuần", image: "https://cinestar.com.vn/media/wysiwyg/tintuc/uudai.jpg", date: "2026-03-25", status: "PUBLISHED" },
];
