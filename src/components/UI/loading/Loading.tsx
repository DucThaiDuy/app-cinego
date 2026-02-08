// Loading.tsx
import "./Loading.scss";

type LoadingProps = {
  fullscreen?: boolean;
  size?: "small" | "medium" | "large";
  text?: string;
};

export default function Loading({
  fullscreen = false,
  size = "medium",
  text = "Đang tải...",
}: LoadingProps) {
  return (
    <div className={`loading-wrapper ${fullscreen ? "fullscreen" : ""}`}>
      <div className={`loading-container ${size}`}>
        {/* Spinner */}
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        {/* Text */}
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
}

// ============================================
// Các biến thể khác
// ============================================

// Loading Dots
export function LoadingDots({ text = "Đang tải" }: { text?: string }) {
  return (
    <div className="loading-dots-wrapper">
      <span className="loading-dots-text">{text}</span>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

// Loading Bar
export function LoadingBar() {
  return (
    <div className="loading-bar-wrapper">
      <div className="loading-bar"></div>
    </div>
  );
}

// Loading Skeleton (cho table rows)
export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="loading-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-item skeleton-avatar"></div>
          <div className="skeleton-item skeleton-text"></div>
          <div className="skeleton-item skeleton-text short"></div>
          <div className="skeleton-item skeleton-text"></div>
        </div>
      ))}
    </div>
  );
}
