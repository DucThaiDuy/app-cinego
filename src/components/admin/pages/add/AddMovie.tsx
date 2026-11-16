import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminmovieService } from "../../../../api/service/movie.service";
import { MessageContainer, useMessage } from "../../../UI/Message/Message";
import Loading from "../../../UI/loading/Loading";
import PageHeader from "../../../UI/PageHearder/PageHeader";
import { ROUTES } from "../../../../constants/routes";
import { Edit, Film, Settings, Building, Search, Image } from "lucide-react";
import "./scss/add-movie.scss";

type MovieForm = {
  title: string;
  originalTitle: string;
  slug: string;
  description: string;
  durationMinutes: string;
  ageRating: string;
  releaseDate: string;
  endDate: string;
  releaseYear: string;
  country: string;
  producer: string;
  distributor: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  imdbRating: string;
  status: string;
  isFeatured: boolean;
  isSpecial: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

export default function AddMoviePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const message = useMessage();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<MovieForm>({
    title: "",
    originalTitle: "",
    slug: "",
    description: "",
    durationMinutes: "",
    ageRating: "P",
    releaseDate: "",
    endDate: "",
    releaseYear: new Date().getFullYear().toString(),
    country: "",
    producer: "",
    distributor: "",
    posterUrl: "",
    bannerUrl: "",
    trailerUrl: "",
    imdbRating: "",
    status: "COMING_SOON",
    isFeatured: false,
    isSpecial: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  // Fetch data if edit mode
  useEffect(() => {
    if (isEdit) {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const data = await adminmovieService.fetchMovieById(Number(id));
          // Map data to form
          setForm({
            ...data,
            durationMinutes: data.durationMinutes?.toString() || "",
            imdbRating: data.rating?.toString() || data.imdbRating?.toString() || "",
            releaseYear: data.releaseYear?.toString() || "",
            // Handle possibility of nulls
             originalTitle: data.originalTitle || "",
             slug: data.slug || "",
             description: data.description || "",
             ageRating: data.ageRating || "P",
             releaseDate: data.releaseDate || "",
             endDate: data.endDate || "",
             country: data.country || "",
             producer: data.producer || "",
             distributor: data.distributor || "",
             posterUrl: data.posterUrl || "",
             bannerUrl: data.bannerUrl || "",
             trailerUrl: data.trailerUrl || "",
             status: data.status || "COMING_SOON",
             isFeatured: data.isFeatured || false,
             isSpecial: data.isSpecial || false,
             seoTitle: data.seoTitle || "",
             seoDescription: data.seoDescription || "",
             seoKeywords: data.seoKeywords || "",
          });
        } catch (err: any) {
          message.error("Không thể tải thông tin phim!");
          navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.MOVIES}`);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id, isEdit, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Movie data submitted:", form);
      const payload = {
        ...form,
        durationMinutes: parseInt(form.durationMinutes) || 0,
        imdbRating: parseFloat(form.imdbRating) || 0,
        releaseYear: parseInt(form.releaseYear) || 0,
        rating: parseFloat(form.imdbRating) || 0, // ensure both are set
      };

      if (isEdit) {
        await adminmovieService.updateMovie(Number(id), payload);
        message.success("Cập nhật phim thành công!");
      } else {
        await adminmovieService.createMovie(payload);
        message.success("Thêm phim thành công!");
      }

      setTimeout(() => {
        navigate(`${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.MOVIES}`);
      }, 1000);
    } catch (err: any) {
      console.error("Add movie failed:", err);
      message.error(err.response?.data?.message || "Lỗi khi thêm phim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-movie-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      {loading && <Loading text="Đang xử lý..." />}

      <PageHeader
        showBack
        breadcrumbs={[
          {
            label: "Trang chủ",
            path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.DASHBOARD}`,
          },
          {
            label: "Quản lý phim",
            path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.MOVIES}`,
          },
          { label: isEdit ? `Cập nhật: ${form.title}` : "Thêm phim mới" },
        ]}
      />

      <form className="movie-form-v2" onSubmit={handleSubmit}>
        <div className="form-layout-grid">
          {/* LEFT COLUMN: Main Form */}
          <div className="form-main-content">
            {/* Section 1: Basic Info */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-icon">{isEdit ? <Edit size={20} /> : <Film size={20} />}</span>
                <h3>{isEdit ? "Cập nhật thông tin" : "Thông tin cơ bản"}</h3>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group flex-2">
                    <label>Tên phim *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="VD: Avatar: The Way of Water"
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Tên gốc</label>
                    <input
                      name="originalTitle"
                      value={form.originalTitle}
                      onChange={handleChange}
                      placeholder="Original title"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Đường dẫn (Slug) *</label>
                  <div className="input-with-action">
                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="avatar-the-way-of-water"
                      required
                    />
                    <button
                      type="button"
                      className="btn-auto"
                      onClick={generateSlug}
                    >
                      Tự động tạo
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả phim</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Viết tóm tắt nội dung phim tại đây..."
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Technical Details */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-icon"><Settings size={20} /></span>
                <h3>Thông số kỹ thuật</h3>
              </div>
              <div className="card-body">
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Thời lượng (phút)</label>
                    <input
                      type="number"
                      name="durationMinutes"
                      value={form.durationMinutes}
                      onChange={handleChange}
                      placeholder="120"
                    />
                  </div>
                  <div className="form-group">
                    <label>Độ tuổi</label>
                    <select
                      name="ageRating"
                      value={form.ageRating}
                      onChange={handleChange}
                    >
                      <option value="P">P – Mọi lứa tuổi</option>
                      <option value="K">K – Trẻ em</option>
                      <option value="T13">T13 – Trên 13 tuổi</option>
                      <option value="T16">T16 – Trên 16 tuổi</option>
                      <option value="T18">T18 – Trên 18 tuổi</option>
                      <option value="C">C – Cấm chiếu</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>IMDb Score</label>
                    <input
                      type="number"
                      step="0.1"
                      name="imdbRating"
                      value={form.imdbRating}
                      onChange={handleChange}
                      placeholder="8.5"
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Ngày khởi chiếu</label>
                    <input
                      type="date"
                      name="releaseDate"
                      value={form.releaseDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Năm sản xuất</label>
                    <input
                      type="number"
                      name="releaseYear"
                      value={form.releaseYear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="COMING_SOON">Sắp chiếu</option>
                      <option value="NOW_SHOWING">Đang chiếu</option>
                      <option value="ENDED">Ngừng chiếu</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Production */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-icon"><Building size={20} /></span>
                <h3>Sản xuất & Phát hành</h3>
              </div>
              <div className="card-body">
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Quốc gia</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="VD: USA"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nhà sản xuất</label>
                    <input
                      name="producer"
                      value={form.producer}
                      onChange={handleChange}
                      placeholder="Producer name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nhà phát hành</label>
                    <input
                      name="distributor"
                      value={form.distributor}
                      onChange={handleChange}
                      placeholder="Distributor name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: SEO */}
            <div className="form-card seo-card">
              <div className="card-header">
                <span className="card-icon"><Search size={20} /></span>
                <h3>Cấu hình SEO</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>SEO Title</label>
                  <input
                    name="seoTitle"
                    value={form.seoTitle}
                    onChange={handleChange}
                    placeholder="Tiêu đề hiển thị trên Google"
                  />
                </div>
                <div className="form-group">
                  <label>SEO Description</label>
                  <textarea
                    name="seoDescription"
                    value={form.seoDescription}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Mô tả ngắn cho công cụ tìm kiếm..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Media & Preview */}
          <div className="form-side-content">
            {/* Media Links */}
            <div className="form-card">
              <div className="card-header">
                <span className="card-icon"><Image size={20} /></span>
                <h3>Hình ảnh & Trailer</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Poster URL</label>
                  <input
                    name="posterUrl"
                    value={form.posterUrl}
                    onChange={handleChange}
                    placeholder="Link ảnh poster dọc"
                  />
                </div>
                <div className="form-group">
                  <label>Banner URL</label>
                  <input
                    name="bannerUrl"
                    value={form.bannerUrl}
                    onChange={handleChange}
                    placeholder="Link ảnh banner ngang"
                  />
                </div>
                <div className="form-group">
                  <label>Trailer (Youtube Link)</label>
                  <input
                    name="trailerUrl"
                    value={form.trailerUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div className="flags-group">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={form.isFeatured}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    <span>Phim nổi bật (Hot)</span>
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="isSpecial"
                      checked={form.isSpecial}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    <span>Suất chiếu đặc biệt</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Poster */}
            <div className="preview-card">
              <label>Xem trước Poster</label>
              <div className="poster-preview-box">
                {form.posterUrl ? (
                  <img src={form.posterUrl} alt="Poster preview" />
                ) : (
                  <div className="no-image">Chưa có ảnh</div>
                )}
                <div className="age-badge-preview">{form.ageRating}</div>
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="sticky-actions">
              <button type="submit" className="btn-submit-main">
                {isEdit ? "Cập nhật ngay" : "Lưu phim ngay"}
              </button>
              <button
                type="button"
                className="btn-cancel-main"
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
