import { useState } from "react";
import type { Cinema } from "../../../model/Cinema";
import type { CinemaStatus } from "../../../model/Cinema";
import { CINEMA_STATUS } from "../../../ENUM/CinemaStatus.enum";
import TimeField from "../../../UI/TimeField";
import InputField from "../../../UI/InputField";
import "./scss/add-cinema.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";

// type CinemaStatus = "active" | "inactive" | "maintenance";

// type AddCinemaForm = {
//   name: string;
//   address: string;
//   ward: string;
//   district: string;
//   city: string;
//   phone: string;
//   email: string;
//   opening_time: string;
//   closing_time: string;
//   description: string;
//   status: CinemaStatus;
// };

export default function AddCinema() {
  const [form, setForm] = useState<Cinema>({
    name: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    phone: "",
    email: "",
    opening_time: "",
    closing_time: "",
    description: "",
    status: CINEMA_STATUS.ACTIVE,
  });

  const [touched, setTouched] = useState({
    closing_time: false,
    opening_time: false,
    name: false,
  });

  const [error, setError] = useState("");

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = (e: React.FormEvent) => {
    setError("");

    const payload = {
      ...form,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("ADD CINEMA PAYLOAD 👉", payload);

    alert("Thêm rạp thành công (mock)");
  };

  return (
    <div className="add-cinema-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý rạp phim", path: "/admin/cinemas" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Thêm mới" },
        ]}
        // action={
        //   <button
        //     className="btn-add"
        //     onClick={() => navigate("/admin/cinema/add-cinema")}
        //   >
        //     + Thêm Rạp phim
        //   </button>
        // }
      />

      <form className="cinema-form" onSubmit={handleSubmit}>
        {/* ===== BASIC INFO ===== */}
        <div className="form-grid">
          <div className="form-group">
            <label>Tên rạp *</label>
            {/* <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="VD: CGV Vincom Đồng Khởi"
            /> */}
            <InputField
              value={form.name ?? ""}
              placeholder="Nhập tên phim"
              required
              error={
                touched.name && !form.name
                  ? "Tên phim không được để trống"
                  : undefined
              }
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Thành phố *</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Hồ Chí Minh"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Địa chỉ *</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Số nhà, đường..."
          />
        </div>

        {/* ===== LOCATION DETAIL ===== */}
        <div className="form-grid">
          <div className="form-group">
            <label>Phường</label>
            <input name="ward" value={form.ward} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Quận / Huyện</label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===== CONTACT ===== */}
        <div className="form-grid">
          <div className="form-group">
            <label>Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===== TIME ===== */}
        <div className="form-grid">
          <div className="form-group">
            <label>Giờ mở cửa</label>
            {/* <input
              type="time"
              name="opening_time"
              value={form.opening_time}
              onChange={handleChange}
            /> */}
            <TimeField
              value={form.opening_time ?? ""}
              required
              error={
                touched.opening_time && !form.opening_time
                  ? "Vui lòng chọn giờ đóng cửa"
                  : undefined
              }
              onChange={(e) =>
                setForm({ ...form, opening_time: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Giờ đóng cửa</label>
            {/* <input
              type="time"
              name="closing_time"
              value={form.closing_time}
              onChange={handleChange}
            /> */}
            <TimeField
              value={form.closing_time ?? ""}
              required
              error={
                touched.closing_time && !form.closing_time
                  ? "Vui lòng chọn giờ đóng cửa"
                  : undefined
              }
              onChange={(e) =>
                setForm({ ...form, closing_time: e.target.value })
              }
            />
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* ===== STATUS ===== */}
        <div className="form-group">
          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngưng hoạt động</option>
            <option value="maintenance">Bảo trì</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        {/* ===== ACTIONS ===== */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Lưu rạp
          </button>
          <button type="button" className="btn-outline">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
