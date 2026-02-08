import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  allow: string[];
  children: JSX.Element;
}

export default function RoleGuard({ allow, children }: Props) {
  const token = localStorage.getItem("access_token");

  const adminInfo = JSON.parse(localStorage.getItem("admin_info") || "{}");

  const role = adminInfo.role;

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!role || !allow.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
