import { useState, useEffect } from "react";
import SearchableSelect from "../../../UI/SearchableSelect/SearchableSelect";
import type { SelectOption } from "../../../UI/SearchableSelect/SearchableSelect";

import "./scss/add-showtime.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";

export default function AddShowtime() {
  const [movieId, setMovieId] = useState<number | string>("");
  const movieOptions: SelectOption[] = [
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
    {
      value: 1,
      label: "Avengers: Endgame",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      value: 2,
      label: "Avatar 2",
      image: "https://i.pravatar.cc/40?img=2",
    },
  ];

  const [form, setForm] = useState({
    movie_id: "",
    hall_id: "",
    show_date: "",
    show_time: "",
    format: "2D",
    language: "subtitle",
    status: "available",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const show_datetime = `${form.show_date} ${form.show_time}`;
    console.log({ ...form, show_datetime });
    alert("Thêm lịch chiếu thành công.");
    // alert("Tạo lịch chiếu thành công (mock)");
  };

  return (
    <div className="add-showtime-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim", path: "/admin/movies" },
          { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Thêm mới" },
        ]}
        // action={
        //   <button
        //     className="btn-add"
        //     onClick={() => navigate("/admin/showtime/add-showtime")}
        //   >
        //     + Thêm lịch chiếu
        //   </button>
        // }
      />

      <form className="showtime-form" onSubmit={handleSubmit}>
        {/* MOVIE */}
        <div className="form-group">
          <label>🎬 Phim</label>
          <select
            name="movie_id"
            required
            value={form.movie_id}
            onChange={handleChange}
          >
            <option value="">-- Chọn phim --</option>
            <option value="1">Avengers: Endgame</option>
            <option value="2">Dune Part Two</option>
          </select>
        </div>

        {/* HALL */}
        <div className="form-group">
          <label>🏢 Phòng chiếu</label>
          <SearchableSelect
            label=""
            placeholder="Tìm phim..."
            options={movieOptions}
            value={movieId}
            onChange={(value) => setMovieId(value)}
          />
          {/* <select
            name="hall_id"
            required
            value={form.hall_id}
            onChange={handleChange}
          >
            <option value="">-- Chọn phòng --</option>
            <option value="1">CGV Vincom – Hall 1</option>
            <option value="2">CGV Vincom – Hall 2</option>
          </select> */}
        </div>

        {/* DATE */}
        <div className="form-group">
          <label>📅 Ngày chiếu</label>
          <input
            type="date"
            name="show_date"
            required
            value={form.show_date}
            onChange={handleChange}
          />
        </div>

        {/* TIME */}
        <div className="form-group">
          <label>⏰ Giờ chiếu</label>
          <input
            type="time"
            name="show_time"
            required
            value={form.show_time}
            onChange={handleChange}
          />
        </div>

        {/* FORMAT */}
        <div className="form-group">
          <label>🎞 Định dạng</label>
          <select name="format" value={form.format} onChange={handleChange}>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>
          </select>
        </div>

        {/* LANGUAGE */}
        <div className="form-group">
          <label>🌐 Ngôn ngữ</label>
          <select name="language" value={form.language} onChange={handleChange}>
            <option value="subtitle">Phụ đề</option>
            <option value="dubbed">Lồng tiếng</option>
          </select>
        </div>

        {/* STATUS */}
        <div className="form-group">
          <label>📌 Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="available">Còn vé</option>
            <option value="full">Hết vé</option>
            <option value="cancelled">Hủy</option>
            <option value="ended">Đã chiếu</option>
          </select>
        </div>

        {/* ACTION */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            💾 Lưu lịch chiếu
          </button>
        </div>
      </form>
    </div>
  );
}
