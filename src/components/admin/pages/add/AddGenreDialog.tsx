import React, { useState } from "react";
import FloatingInput from "../../../UI/FloatingInput";
import FloatingTextarea from "../../../UI/FloatingTextarea";
import "./scss/add-genre-dialog.scss";

type AddGenreDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; slug: string; description: string }) => void;
};

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !slug) return alert("Tên và slug là bắt buộc!");
    onAdd({ name, slug, description });
    setName("");
    setSlug("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h2>Thêm thể loại mới</h2>

        <FloatingInput
          label="Tên thể loại"
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
          label="Mô tả thể loại"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
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
};

export default AddGenreDialog;
