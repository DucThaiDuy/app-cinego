# 🎬 CineGo - Nhánh FontEnd

> Hệ thống quản lý và đặt vé xem phim nội bộ **CineGo**.  
> Được phát triển bằng React 19, Vite, TypeScript, và Material-UI.

📌 **Tài liệu dự án (chức năng & công nghệ):** Vui lòng đọc file [PROJECT_INFOR.md](./PROJECT_INFOR.md).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án (Local Setup)

Tài liệu này hướng dẫn cách cấu hình dự án ở dưới máy sau khi pull/clone code từ nhánh `main`.

### 1️⃣ Yêu cầu môi trường (Prerequisites)
- [Node.js](https://nodejs.org/en) (Bắt buộc phiên bản `18.x` hoặc cao hơn)
- `npm` (hoặc `yarn` / `pnpm`)

### 2️⃣ Các Bước Cài Đặt (Installation)

**Bước 1: Clone dự án về máy của bạn**
```bash
git clone https://github.com/DucThaiDuy/app-cinego.git
```
Di chuyển vào thư mục code vừa tải:
```bash
cd app-cinego
```

**Bước 2: Cài đặt các thư viện (Dependencies)**
```bash
npm install
```
*(Lưu ý: Nếu gặp lỗi xung đột version từ các gói MUI/React-QR, bạn có thể chạy `npm install --legacy-peer-deps`)*.

**Bước 3: Cấu hình biến môi trường (.env)**
Tạo một file có tên `.env` ở thư mục gốc (nằm cùng chỗ với `package.json`). Sao chép dữ liệu từ file mẫu:
```bash
cp .env.example .env
```
*(Thêm API Link được cung cấp từ nhóm Backend vào trong file `.env`)*

**Bước 4: Khởi động Server (Local Development)**
```bash
npm run dev
```
Dự án sẽ tự động chạy tại cổng: `http://localhost:5173`

---

## 🛠️ Các Lệnh Bổ Trợ Khác (Scripts)

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Bật server môi trường Dev (có Hot-Reload) |
| `npm run build` | Đóng gói dự án để triển khai Production |
| `npm run preview` | Chạy thử bản Production vừa được build trên máy cá nhân |
| `npm run lint` | Chạy bộ kiểm tra lỗi cú pháp ESLint |

---

*Phát triển bởi [DucThaiDuy](https://github.com/DucThaiDuy).*
