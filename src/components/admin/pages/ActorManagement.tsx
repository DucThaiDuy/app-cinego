import { useState, useMemo, useCallback, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import AddActorDialog from "./add/AddActorDialog";
import Pagination from "../../UI/Pagination";
import { ConfirmContainer, useConfirm } from "../../UI/Confirm/Confirm";

import "./actor.scss";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { Actor } from "../../../api/types/model/actor.model";
import { MessageContainer, useMessage } from "../../UI/Message/Message";
import { adminActorService } from "../../../api/service/actor.service";
import { ActorRequest } from "../../../api/types/request/ActorRequest";
import { MESSAGES } from "../../../constants/ui-text";
// import { useConfirm } from "../../UI/Confirm/Confirm";

export default function ActorManagement() {
  const [actors, setActors] = useState<Actor[]>([]);
  const message = useMessage();
  const { confirms, confirm, removeConfirm } = useConfirm();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadActors = async (page: number, size: number) => {
    setLoading(true);
    try {
      const data = await adminActorService.fetchUsers({
        page,
        limit: size,
      });

      if (!data) return;

      setActors(data.items);
      setTotalItems(data.totalItems);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // reset page khi filter
  }, [searchTerm]);
  useEffect(() => {
    loadActors(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, searchTerm]);

  /* ===== CRUD ===== */
  const handleDelete = (id: number) => {
    confirm(
      "Bạn có chắc chắn muốn xóa diễn viên này?",
      () => {
        setActors((prev) => prev.filter((a) => a.id !== id));
        try {
          adminActorService.deleteUser(id);
          // loadActors();
          message.success("Xóa diễn viên thành công");
        } catch (err: any) {
          console.log(err.message);
          message.error("Xóa diễn viên thất bại: ");
        }
      },
      {
        type: "danger",
        title: "Xóa diễn viên",
        confirmText: "Xóa",
        cancelText: "Hủy",
      },
    );
  };

  const handleUpdate = (id: number) => {
    // alert("Update actor id = " + id);
    message.info(`Đang mở form sửa user #${id}`);
  };

  const handleAddActor = async (data: ActorRequest) => {
    try {
      const newGenre = await adminActorService.addGenre(data);

      setActors((prev) => [newGenre, ...prev]); // add lên đầu list
      setIsDialogOpen(false);
      message.success(MESSAGES.ADD_SUCCESS);
    } catch (error) {
      message.error(MESSAGES.ADD_ERROR);
      console.error("Add genre failed", error);
    }
  };

  return (
    <div className="actor-page">
      {/* UI page */}
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <ConfirmContainer confirms={confirms} onRemove={removeConfirm} />
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý phim", path: "/admin/movies" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Diễn viên" },
        ]}
        action={
          <button className="btn-add" onClick={() => setIsDialogOpen(true)}>
            + Thêm diễn viên
          </button>
        }
      />
      {/* SEARCH */}
      <div className="actor-page__search">
        <FaSearch className="search-icon" />
        <input
          placeholder="Tìm theo tên hoặc slug..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="actor-table-wrapper">
        <table className="actor-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Slug</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((a) => (
              <tr key={a.id}>
                <td>
                  <img
                    src={a.avatarUrl || "/avatar.png"}
                    className="actor-avatar"
                  />
                </td>
                <td>{a.name}</td>
                <td className="slug">{a.slug}</td>
                <td className="bio">{a.bio}</td>
                <td>{a.createdAt}</td>
                <td className="actions">
                  <TooltipIconButton
                    title="Xóa"
                    onClick={() => handleDelete(a.id!)}
                    size={40}
                    color="#c52929"
                  >
                    <DeleteIcon />
                  </TooltipIconButton>

                  <TooltipIconButton
                    title="Cập nhật"
                    onClick={() => handleUpdate(a.id!)}
                    size={40}
                    color="#555"
                  >
                    <BorderColorIcon />
                  </TooltipIconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
          itemsPerPageOptions={[10, 25, 50, 100]}
          maxVisible={2}
        />
      </div>

      <AddActorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddActor}
      />
    </div>
  );
}
