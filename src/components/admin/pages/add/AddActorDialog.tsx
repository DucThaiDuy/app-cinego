import { useState } from "react";
import FloatingInput from "../../../UI/FloatingInput";
import FloatingTextarea from "../../../UI/FloatingTextarea";
import "./scss/add-actor-dialog.scss";
import { ActorRequest } from "../../../../api/types/request/ActorRequest";

type AddActorDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: ActorRequest) => void;
};

export default function AddActorDialog({
  isOpen,
  onClose,
  onAdd,
}: AddActorDialogProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = () => {
    if (!name || !slug) return alert("Tên và slug là bắt buộc!");
    onAdd({ name, slug, bio, avatarUrl: avatar });
    // reset
    setName("");
    setSlug("");
    setBio("");
    setAvatar("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h2>Thêm diễn viên mới</h2>

        <FloatingInput
          label="Tên diễn viên"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Slug"
          name="slug"
          value={slug}
          required
          onChange={(e) => setSlug(e.target.value)}
        />

        <FloatingTextarea
          label="Tiểu sử"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
        />

        <FloatingInput
          label="Avatar URL"
          name="avatar_url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
