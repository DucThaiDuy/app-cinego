import { useEffect, useState } from "react";
import "./Message.scss";

type MessageProps = {
  type?: "success" | "error" | "warning" | "info";
  text: string;
  duration?: number;
  onClose?: () => void;
};

const Message: React.FC<MessageProps> = ({
  type = "info",
  text,
  duration = 3000,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };
    return icons[type];
  };

  return (
    <div className={`message message--${type} ${isExiting ? "exit" : ""}`}>
      <div className="message__content">
        <span className="message__icon">{getIcon()}</span>
        <span className="message__text">{text}</span>
        <button className="message__close" onClick={handleClose}>
          ✕
        </button>
      </div>
      <div
        className="message__progress"
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

export default Message;
// ====================================
// MESSAGE CONTAINER
// ====================================
type MessageContainerProps = {
  messages: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    text: string;
  }>;
  onRemove: (id: string) => void;
};

export const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  onRemove,
}) => {
  return (
    <div className="message-container">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          type={msg.type}
          text={msg.text}
          onClose={() => onRemove(msg.id)}
        />
      ))}
    </div>
  );
};

// ====================================
// CUSTOM HOOK - useMessage
// ====================================
export const useMessage = () => {
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      type: "success" | "error" | "warning" | "info";
      text: string;
    }>
  >([]);

  const showMessage = (
    text: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    const id = Date.now().toString() + Math.random();
    setMessages((prev) => [...prev, { id, type, text }]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return {
    messages,
    showMessage,
    success: (text: string) => showMessage(text, "success"),
    error: (text: string) => showMessage(text, "error"),
    warning: (text: string) => showMessage(text, "warning"),
    info: (text: string) => showMessage(text, "info"),
    removeMessage,
  };
};
