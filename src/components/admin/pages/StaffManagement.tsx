import React, { useState } from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MOCK_STAFF } from "../../../api/service/mock/mockData";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./StaffManagement.scss";

const StaffManagement = () => {
  const [staff] = useState(MOCK_STAFF);

  return (
    <div className="staff-management">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Quản lý Nhân sự" },
        ]}
        action={
          <button className="btn-add">
            <span>+</span> Thêm nhân viên
          </button>
        }
      />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon"><AdminPanelSettingsIcon /></div>
          <div className="stat-info">
            <span className="stat-label">Tổng nhân sự</span>
            <span className="stat-value">{staff.length}</span>
          </div>
        </div>
      </div>

      <div className="table-container shadow-premium">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Chức vụ</th>
              <th>Cụm rạp</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td className="name-cell"><strong>{s.fullName}</strong></td>
                <td>{s.email}</td>
                <td>
                   <span className={`role-badge ${s.role.toLowerCase()}`}>{s.role}</span>
                </td>
                <td>{s.cinema}</td>
                <td>
                  <span className={`status-pill ${s.status.toLowerCase()}`}>
                    {s.status === "ACTIVE" ? "Đang làm việc" : "Đã nghỉ"}
                  </span>
                </td>
                <td className="actions-cell">
                  <TooltipIconButton title="Chỉnh sửa" color="#4f46e5">
                    <EditIcon fontSize="small" />
                  </TooltipIconButton>
                  <TooltipIconButton title="Xóa" color="#ef4444">
                    <DeleteIcon fontSize="small" />
                  </TooltipIconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
