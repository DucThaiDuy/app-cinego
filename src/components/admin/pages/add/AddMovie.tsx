// AddMoviePage.tsx
import { useState } from "react";
import "./scss/add-movie.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";

type MovieForm = {
  title: string;
  original_title: string;
  slug: string;
  description: string;
  duration_minutes: string;
  age_rating: string;
  release_date: string;
  end_date: string;
  release_year: string;
  country: string;
  producer: string;
  distributor: string;
  poster_url: string;
  banner_url: string;
  trailer_url: string;
  imdb_rating: string;
  status: string;
  is_featured: boolean;
  is_special: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
};

export default function AddMoviePage() {
  const [form, setForm] = useState<MovieForm>({
    title: "",
    original_title: "",
    slug: "",
    description: "",
    duration_minutes: "",
    age_rating: "P",
    release_date: "",
    end_date: "",
    release_year: "",
    country: "",
    producer: "",
    distributor: "",
    poster_url: "",
    banner_url: "",
    trailer_url: "",
    imdb_rating: "",
    status: "coming_soon",
    is_featured: false,
    is_special: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Movie data:", form);
    alert("Thêm phim thành công!");
  };

  return (
    <div className="add-movie-page">
      {/* <h1>🎬 Thêm phim mới</h1> */}

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim", path: "/admin/movies" },
          { label: "Thêm mới" },
        ]}
        // action={
        //   <button
        //     className="btn-add"
        //     onClick={() => navigate("/admin/movies/add-movie")}
        //   >
        //     + Thêm phim
        //   </button>
        // }
      />

      <form className="movie-form" onSubmit={handleSubmit}>
        {/* Tên phim */}
        <div className="form-row">
          <div className="form-group">
            <label>Tên phim *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Avatar: The Way of Water"
              required
            />
          </div>

          <div className="form-group">
            <label>Tên gốc</label>
            <input
              name="original_title"
              value={form.original_title}
              onChange={handleChange}
              placeholder="Original title"
            />
          </div>
        </div>

        {/* Slug */}
        <div className="form-group slug-group">
          <label>Slug *</label>
          <div className="slug-wrapper">
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="avatar-the-way-of-water"
              required
            />
            <button type="button" onClick={generateSlug}>
              🔄 Auto
            </button>
          </div>
        </div>

        {/* Mô tả */}
        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả ngắn gọn về phim..."
          />
        </div>

        {/* Thời lượng, Phân loại, IMDb */}
        <div className="form-row">
          <div className="form-group">
            <label>Thời lượng (phút) *</label>
            <input
              type="number"
              name="duration_minutes"
              value={form.duration_minutes}
              onChange={handleChange}
              placeholder="120"
              required
            />
          </div>

          <div className="form-group">
            <label>Phân loại *</label>
            <select
              name="age_rating"
              value={form.age_rating}
              onChange={handleChange}
            >
              <option value="P">P – Phổ biến</option>
              <option value="K">K – Trẻ em</option>
              <option value="T13">T13 – 13+</option>
              <option value="T16">T16 – 16+</option>
              <option value="T18">T18 – 18+</option>
              <option value="C">C – Cấm chiếu</option>
            </select>
          </div>

          <div className="form-group">
            <label>IMDb</label>
            <input
              type="number"
              step="0.1"
              name="imdb_rating"
              value={form.imdb_rating}
              onChange={handleChange}
              placeholder="8.5"
            />
          </div>
        </div>

        {/* Trạng thái */}
        <div className="form-group">
          <label>Trạng thái *</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="coming_soon">Sắp chiếu</option>
            <option value="now_showing">Đang chiếu</option>
            <option value="ended">Đã kết thúc</option>
          </select>
        </div>

        {/* Ngày khởi chiếu, Ngày kết thúc, Năm */}
        <div className="form-row">
          <div className="form-group">
            <label>Ngày khởi chiếu *</label>
            <input
              type="date"
              name="release_date"
              value={form.release_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ngày kết thúc</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Năm phát hành</label>
            <input
              type="number"
              name="release_year"
              value={form.release_year}
              onChange={handleChange}
              placeholder="2024"
            />
          </div>
        </div>

        {/* Quốc gia, Nhà sản xuất, Nhà phát hành */}
        <div className="form-row">
          <div className="form-group">
            <label>Quốc gia</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="USA, Việt Nam"
            />
          </div>

          <div className="form-group">
            <label>Nhà sản xuất</label>
            <input
              name="producer"
              value={form.producer}
              onChange={handleChange}
              placeholder="Warner Bros"
            />
          </div>

          <div className="form-group">
            <label>Nhà phát hành</label>
            <input
              name="distributor"
              value={form.distributor}
              onChange={handleChange}
              placeholder="CGV, Galaxy"
            />
          </div>
        </div>

        {/* Media URLs */}
        <div className="form-group">
          <label>Poster URL</label>
          <input
            type="url"
            name="poster_url"
            value={form.poster_url}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
          />
        </div>

        <div className="form-group">
          <label>Banner URL</label>
          <input
            type="url"
            name="banner_url"
            value={form.banner_url}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        <div className="form-group">
          <label>Trailer URL</label>
          <input
            type="url"
            name="trailer_url"
            value={form.trailer_url}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        {/* SEO */}
        <div className="form-group">
          <label>SEO Title</label>
          <input
            name="seo_title"
            value={form.seo_title}
            onChange={handleChange}
            placeholder="Tên phim - Xem phim online"
          />
        </div>

        <div className="form-group">
          <label>SEO Description</label>
          <textarea
            name="seo_description"
            value={form.seo_description}
            onChange={handleChange}
            rows={2}
            placeholder="Mô tả cho SEO..."
          />
        </div>

        <div className="form-group">
          <label>SEO Keywords</label>
          <input
            name="seo_keywords"
            value={form.seo_keywords}
            onChange={handleChange}
            placeholder="phim, hành động, 2024"
          />
        </div>

        {/* Checkboxes */}
        <div className="form-checkboxes">
          <label>
            <input
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleChange}
            />
            <span>🌟 Phim nổi bật</span>
          </label>

          <label>
            <input
              type="checkbox"
              name="is_special"
              checked={form.is_special}
              onChange={handleChange}
            />
            <span>💎 Phim đặc biệt</span>
          </label>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save">
            💾 Lưu phim
          </button>
          <button type="button" className="btn-cancel">
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
