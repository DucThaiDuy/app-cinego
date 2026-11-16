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
import { ROUTES } from "../../../constants/routes";
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
          { label: "Trang chủ", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.DASHBOARD}` },
          { label: "Quản lý phim", path: `${ROUTES.MANAGER.BASE}/${ROUTES.MANAGER.MOVIES}` },
          { label: "Diễn viên" },
        ]}
        action={
          <button className="btn-add" onClick={() => setIsDialogOpen(true)}>
            + Thêm diễn viên
          </button>
        }
      />
      {/* SEARCH */}
      <div className="actor-page__search shadow-premium" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', marginBottom: '16px', background: 'var(--admin-bg-elevated)', borderRadius: 'var(--admin-radius-md)' }}>
        <FaSearch className="search-icon" color="var(--admin-text-muted)" />
        <input
          className="form-control"
          placeholder="Tìm theo tên hoặc slug..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0 }}
        />
      </div>

      {/* TABLE */}
      <div className="actor-table-wrapper">
        <table className="modern-table">
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
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--admin-border)' }}
                  />
                </td>
                <td><strong>{a.name}</strong></td>
                <td className="slug" style={{ color: 'var(--admin-text-muted)' }}>{a.slug}</td>
                <td className="bio" style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.bio}</td>
                <td>{a.createdAt}</td>
                <td>
                  <div className="actions" style={{ display: 'flex', gap: '8px' }}>
                    <TooltipIconButton
                      title="Cập nhật"
                      onClick={() => handleUpdate(a.id!)}
                      size={40}
                      color="var(--admin-text-muted)"
                    >
                      <BorderColorIcon width={18} height={18} />
                    </TooltipIconButton>
                    <TooltipIconButton
                      title="Xóa"
                      onClick={() => handleDelete(a.id!)}
                      size={40}
                      color="var(--admin-danger)"
                    >
                      <DeleteIcon width={18} height={18} />
                    </TooltipIconButton>
                  </div>
                </td>
              </tr>
            ))}
            {actors.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
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
