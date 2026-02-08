import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.scss";

type Role = "ADMIN" | "MANAGER";

type AdminBaseLayoutProps = {
  basePath: string;
  role: Role;
};

export default function AdminBaseLayout({
  basePath,
  role,
}: AdminBaseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      {/* Sidebar nhận trạng thái isOpen */}
      <Sidebar isOpen={sidebarOpen} basePath={basePath} role={role} />

      <div className="admin-main">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
