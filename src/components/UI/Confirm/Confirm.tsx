import { useState } from "react";
import "./Confirm.scss";

/* ================================
   TYPES
================================ */
type ConfirmType = "danger" | "warning" | "info";

type ConfirmItem = {
  id: string;
  title?: string;
  message: string;
  type?: ConfirmType;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

/* ================================
   CONFIRM COMPONENT
================================ */
const Confirm = ({
  data,
  onConfirm,
  onCancel,
}: {
  data: ConfirmItem;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const {
    title = "Xác nhận",
    message,
    type = "warning",
    confirmText = "Xác nhận",
    cancelText = "Hủy",
  } = data;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className={`confirm confirm--${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm__actions">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================
   CONFIRM CONTAINER
================================ */
export const ConfirmContainer = ({
  confirms,
  onRemove,
}: {
  confirms: ConfirmItem[];
  onRemove: (id: string) => void;
}) => {
  if (!confirms.length) return null;

  const current = confirms[0]; // chỉ 1 confirm tại 1 thời điểm

  return (
    <Confirm
      data={current}
      onCancel={() => onRemove(current.id)}
      onConfirm={() => {
        current.onConfirm();
        onRemove(current.id);
      }}
    />
  );
};

/* ================================
   useConfirm HOOK
================================ */
export const useConfirm = () => {
  const [confirms, setConfirms] = useState<ConfirmItem[]>([]);

  const confirm = (
    message: string,
    onConfirm: () => void,
    options?: {
      title?: string;
      type?: ConfirmType;
      confirmText?: string;
      cancelText?: string;
    },
  ) => {
    const id = Date.now().toString() + Math.random();

    setConfirms((prev) => [
      ...prev,
      {
        id,
        message,
        onConfirm,
        ...options,
      },
    ]);
  };

  const removeConfirm = (id: string) => {
    setConfirms((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    confirms,
    confirm,
    removeConfirm,
  };
};
