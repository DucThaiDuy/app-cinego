import "./GenreManagement.scss";
import { useState, useCallback, useEffect } from "react";
import Pagination from "../../UI/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import CategoryIcon from "@mui/icons-material/Category";
import AddGenreDialog from "./add/AddGenreDialog";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { Genre } from "../../../api/types/model/genre.model";
import { adminGenreService } from "../../../api/service/genre.service";
import Message, {
  MessageContainer,
  useMessage,
} from "../../UI/Message/Message";
import { MESSAGES } from "../../../constants/ui-text";
import { ROUTES } from "../../../constants/routes";

export default function GenreManagement() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const message = useMessage();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGenreService.fetchUsers({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (!data) return;

      setGenres(data.items);
      setTotalItems(data.totalItems);
      setCurrentPage(data.currentPage);
      setItemsPerPage(data.itemsPerPage);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  const handleToggleStatus = async (id: number) => {
    try {
      await adminGenreService.toggleStatus(id);
      loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await adminGenreService.deleteUser(id);
      loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // reset page khi filter
  }, [searchTerm]);
  useEffect(() => {
    loadUsers();
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleUpdate = (id: number) => {
    // ✅ SỬ DỤNG MESSAGE INFO
    message.info(`Đang mở form sửa user #${id}`);
    // TODO: Navigate to edit page
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGenre = async (data: {
    name: string;
    slug: string;
    description: string;
  }) => {
    try {
      const newGenre = await adminGenreService.addGenre(data);

      setGenres((prev) => [newGenre, ...prev]); // add lên đầu list
      setIsDialogOpen(false);
      message.success(MESSAGES.ADD_SUCCESS);
    } catch (error) {
      message.error(MESSAGES.ADD_ERROR);
      console.error("Add genre failed", error);
    }
  };

  return (
    <div className="genre-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />

      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.DASHBOARD}` },
          { label: "Quản lý phim", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.MOVIES}` },
          { label: "Thể loại" },
        ]}
        action={
          <button className="btn-add" onClick={() => setIsDialogOpen(true)}>
            + Thêm phim
          </button>
        }
      />

      {/* FILTER */}
      <div className="genre-filter">
        <input placeholder=" Tìm theo tên hoặc slug..." />
      </div>

      {/* TABLE */}
      <table className="modern-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Slug</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.id}>
              <td><strong>{g.name}</strong></td>
              <td className="slug">{g.slug}</td>
              <td className="desc">{g.description}</td>
              <td>{g.createdAt}</td>
              <td>{g.updatedAt}</td>
              <td>
                <div className="actions" style={{ display: 'flex', gap: '8px' }}>
                  <TooltipIconButton
                    title="Update"
                    onClick={() => handleUpdate(g.id!)}
                    size={40}
                    color="var(--admin-text-muted)"
                  >
                    <BorderColorIcon width={18} height={18} />
                  </TooltipIconButton>
                  <TooltipIconButton
                    title="Delete"
                    onClick={() => handleDelete(g.id!)}
                    size={40}
                    color="var(--admin-danger)"
                  >
                    <DeleteIcon width={18} height={18} />
                  </TooltipIconButton>
                </div>
              </td>
            </tr>
          ))}
          {genres.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* DIALOG THÊM MỚI */}
      <AddGenreDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddGenre}
      />
      {/* Pagination + chọn số item/trang */}
      <div style={{ marginTop: '16px' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1); // reset về trang 1 khi đổi số item/trang
          }}
          itemsPerPageOptions={[10, 25, 50, 100]}
          maxVisible={2}
        />
      </div>
    </div>
  );
}
