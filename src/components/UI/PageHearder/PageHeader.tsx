import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  action?: ReactNode;
  showBack?: boolean;
}

export default function PageHeader({
  breadcrumbs,
  action,
  showBack = false,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="page-header-wrapper">
      <div className="breadcrumb">
        {/* {showBack && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
        )} */}

        {breadcrumbs.map((item, index) => (
          <span
            key={index}
            className={index === breadcrumbs.length - 1 ? "active" : ""}
            onClick={() => item.path && navigate(item.path)}
          >
            {item.label}
            {index < breadcrumbs.length - 1 && (
              <span className="separator"> / </span>
            )}
          </span>
        ))}
      </div>

      {action && <div className="page-header">{action}</div>}
    </div>
  );
}
