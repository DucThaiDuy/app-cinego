import "./MovieManagement.scss";
import { useNavigate } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import { useCallback, useEffect, useState } from "react";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PageHeader from "../../UI/PageHearder/PageHeader";
import Loading from "../../UI/loading/Loading";
import type { MovieResponse } from "../../../api/types/model/movie.model";
import { adminmovieService } from "../../../api/service/movie.service";

type AgeRatingFilter = "ALL" | "P" | "K" | "T13" | "T16" | "T18" | "C";
type StatusFilter = "ALL" | "COMING_SOON" | "NOW_SHOWING" | "ENDED";

export default function MovieManagement() {
  const navigate = useNavigate();

  // State
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState<AgeRatingFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  // Load movies
  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminmovieService.fetchMovies({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (!data) return;

      setMovies(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      console.log("Fetched movies:", data.items.length);
    } catch (err: any) {
      console.error("Load movies error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  // Effects
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, ageFilter, statusFilter]);

  // Handlers
  const handleDelete = (id: number) => {
    console.log("Delete movie:", id);
    alert("Delete clicked!");
  };

  const handleUpdate = (id: number) => {
    console.log("Update movie:", id);
    alert("Update clicked!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  // Utils
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      NOW_SHOWING: "Đang chiếu",
      COMING_SOON: "Sắp chiếu",
      ENDED: "Ngừng chiếu",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    return status?.toLowerCase().replace(/_/g, "-") || "";
  };

  return (
    <div className="movie-page">
      {/* Header */}
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim" },
        ]}
        action={
          <button
            className="btn-add"
            onClick={() => navigate("/admin/movies/add-movie")}
          >
            + Thêm phim
          </button>
        }
      />

      {/* Filters */}
      <div className="movie-filters">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên / slug / mô tả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="filter-select"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="NOW_SHOWING">Đang chiếu</option>
          <option value="COMING_SOON">Sắp chiếu</option>
          <option value="ENDED">Ngừng chiếu</option>
        </select>

        <select
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value as AgeRatingFilter)}
          className="filter-select"
        >
          <option value="ALL">Tất cả độ tuổi</option>
          <option value="P">P - Phổ biến</option>
          <option value="K">K - Trẻ em</option>
          <option value="T13">T13 - 13+</option>
          <option value="T16">T16 - 16+</option>
          <option value="T18">T18 - 18+</option>
          <option value="C">C - Cấm chiếu</option>
        </select>
      </div>

      {/* Table */}
      <div className="movie-table-wrapper">
        {loading ? (
          <Loading text="Đang tải danh sách phim..." />
        ) : (
          <table className="movie-table">
            <thead>
              <tr>
                <th>Phim</th>
                <th>Thời lượng</th>
                <th>Độ tuổi</th>
                <th>Rating</th>
                <th>Trạng thái</th>
                <th>Nổi bật</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    Không tìm thấy phim nào
                  </td>
                </tr>
              ) : (
                movies.map((movie) => (
                  <tr key={movie.id}>
                    {/* Movie Info */}
                    <td>
                      <div className="movie-info">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="movie-poster"
                        />
                        <div className="movie-details">
                          <h4 className="movie-title">{movie.title}</h4>
                          <div className="movie-meta">
                            {movie.originalTitle} • {movie.releaseDate}
                          </div>
                          <div className="movie-extra">
                            {movie.country} • {movie.distributor}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="duration">{movie.durationMinutes} phút</td>

                    {/* Age Rating */}
                    <td>
                      <span className={`age-badge age-${movie.ageRating}`}>
                        {movie.ageRating}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="rating">⭐ {movie.rating}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          movie.status
                        )}`}
                      >
                        {getStatusLabel(movie.status)}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="featured">
                      {movie.isFeatured ? "🔥" : "—"}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="actions">
                        <TooltipIconButton
                          title="Sửa"
                          onClick={() => handleUpdate(movie.id)}
                          size={50}
                          color="#696969"
                        >
                          <BorderColorIcon width={20} height={20} />
                        </TooltipIconButton>
                        <TooltipIconButton
                          title="Xóa"
                          onClick={() => handleDelete(movie.id)}
                          size={50}
                          color="#c52929ff"
                        >
                          <DeleteIcon width={20} height={20} />
                        </TooltipIconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[10, 25, 50, 100]}
          maxVisible={3}
        />
      )}
    </div>
  );
}
