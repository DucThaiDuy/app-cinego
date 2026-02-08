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
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim", path: "/admin/movies" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
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
      <div className="genre-table">
        <div className="table-head">
          <span>Tên</span>
          <span>Slug</span>
          <span>Mô tả</span>
          <span>Ngày tạo</span>
          <span>Cập nhật</span>
          <span>Hành động</span>
        </div>

        {genres.map((g) => (
          <div className="table-row" key={g.id}>
            <strong>{g.name}</strong>
            <span className="slug">{g.slug}</span>
            <span className="desc">{g.description}</span>
            <span>{g.createdAt}</span>
            <span>{g.updatedAt}</span>

            <div className="actions">
              {/* <button>Sửa</button> */}
              <TooltipIconButton
                title="Delete"
                onClick={() => handleDelete(g.id!)}
                size={50}
                color="#c52929ff" // icon đỏ
              >
                <DeleteIcon width={20} height={20} />
              </TooltipIconButton>
              <TooltipIconButton
                title="Update"
                onClick={() => handleUpdate(g.id!)}
                size={50}
                color="#696969"
              >
                <BorderColorIcon width={20} height={20} />
              </TooltipIconButton>
            </div>
          </div>
        ))}
        {/* DIALOG THÊM MỚI */}
        <AddGenreDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={handleAddGenre}
        />
        {/* Pagination + chọn số item/trang */}
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
