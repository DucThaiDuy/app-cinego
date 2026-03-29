# app-cinego 🎬

Trang web quản lý & đặt vé xem phim với các vai trò:

- Admin
- Manager
- Customer

## 🧩 Công nghệ & thư viện sử dụng

### Frontend

- npm install react-router-dom // Router
- npm install @react-oauth/google //LOGIN GOOGLE
- npm install i18next react-i18next // đa ngôn ngữ
- npm install react-icons // Icons
- npm install react-datepicker @types/react-datepicker
- npm install lucide-react
- npm install @mui/material @emotion/react @emotion/styled
- npm install react-qr-reader --legacy-peer-deps

Dashboard
Quản lý phim

- Phim
- Thể loại
- Diễn viên
  Rạp & phòng chiếu
- Rạp
- Phòng chiếu
- Ghế
  Lịch chiếu
  Đặt vé
- Booking
- Check-in
  Combo & dịch vụ
  Voucher & khuyến mãi
  Người dùng
- Khách hàng
- Admin
  Nội dung
- Banner
- Bài viết
  Đánh giá
  Thanh toán
  Cấu hình
  Nhật ký hệ thống

I. CHỨC NĂNG TRANG KHÁCH (USER)
1️⃣ Chức năng chung

Truy cập website không cần đăng nhập

Xem danh sách phim

Tìm kiếm & lọc phim

Responsive (PC / Tablet / Mobile)

2️⃣ Tài khoản người dùng

Đăng ký tài khoản

Đăng nhập / Đăng xuất

Quên mật khẩu

Cập nhật thông tin cá nhân

Đổi mật khẩu

3️⃣ Xem phim

Xem phim đang chiếu

Xem phim sắp chiếu

Xem chi tiết phim:

Poster

Trailer

Nội dung

Thể loại

Thời lượng

Độ tuổi

4️⃣ Tìm kiếm & lọc

Tìm kiếm theo tên phim

Lọc theo:

Thể loại

Quốc gia

Độ tuổi

Đánh giá

5️⃣ Đặt vé xem phim
5.1 Chọn rạp & suất chiếu

Chọn thành phố

Chọn rạp

Chọn ngày chiếu

Chọn giờ chiếu

Xem loại phòng chiếu

5.2 Chọn ghế

Xem sơ đồ ghế

Chọn / bỏ chọn ghế

Phân loại ghế:

Thường

VIP

Đôi

Xem trạng thái ghế:

Trống

Đã bán

Đang chọn

5.3 Thanh toán

Xem lại thông tin vé

Áp dụng mã giảm giá

Chọn phương thức thanh toán

Thanh toán online

Xử lý lỗi thanh toán

6️⃣ Vé điện tử

Tạo vé điện tử sau khi thanh toán

Hiển thị mã QR

Gửi vé qua email

Lưu vé trong tài khoản

7️⃣ Quản lý vé

Xem lịch sử đặt vé

Xem vé sắp chiếu

Hủy vé (theo điều kiện)

8️⃣ Đánh giá & phản hồi

Đánh giá phim (1–5 sao)

Viết bình luận

Chỉ cho phép người đã xem phim

9️⃣ Thông báo

Thông báo đặt vé thành công

Thông báo suất chiếu sắp diễn ra

Thông báo khuyến mãi

🛠️ II. CHỨC NĂNG TRANG QUẢN TRỊ (ADMIN)
1️⃣ Tài khoản Admin

Đăng nhập / Đăng xuất

Phân quyền:

Admin

Nhân viên

Đổi mật khẩu

2️⃣ Dashboard

Xem tổng quan:

Doanh thu

Vé đã bán

Phim đang chiếu

Biểu đồ thống kê

3️⃣ Quản lý phim

Thêm phim

Sửa phim

Xóa phim

Upload poster & trailer

Quản lý trạng thái phim:

Đang chiếu

Sắp chiếu

Ngừng chiếu

4️⃣ Quản lý rạp chiếu

Thêm / sửa / xóa rạp

Quản lý địa chỉ rạp

5️⃣ Quản lý phòng chiếu

Thêm / sửa / xóa phòng

Thiết kế sơ đồ ghế

Thiết lập loại ghế

6️⃣ Quản lý suất chiếu

Tạo suất chiếu mới

Chọn:

Phim

Rạp

Phòng

Ngày & giờ

Thiết lập giá vé

Cập nhật / hủy suất chiếu

7️⃣ Quản lý vé

Xem danh sách vé

Lọc vé theo:

Phim

Ngày

Trạng thái

Hủy vé

Check-in vé bằng QR

8️⃣ Quản lý người dùng

Xem danh sách người dùng

Khóa / mở khóa tài khoản

Phân quyền

9️⃣ Quản lý khuyến mãi

Tạo mã giảm giá

Cập nhật mã giảm giá

Thiết lập điều kiện áp dụng

Kích hoạt / vô hiệu hóa

🔟 Báo cáo & thống kê

Thống kê doanh thu:

Theo ngày / tháng

Theo phim

Phim bán chạy

Xuất báo cáo (Excel / CSV)

11️⃣ Hệ thống & bảo mật

Quản lý phiên đăng nhập

Phân quyền truy cập chức năng

Log hoạt động admin

Backup dữ liệu

📌 Tóm tắt nhanh (để ghi báo cáo)
User:

Xem phim – Đặt vé – Thanh toán – Quản lý vé – Đánh giá

Admin:

Quản lý phim – Rạp – Suất chiếu – Vé – Người dùng – Thống kê
