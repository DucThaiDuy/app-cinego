import React, { useState } from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MOCK_FOOD } from "../../../api/service/mock/mockData";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import "./FoodManagement.scss";

const FoodManagement = () => {
  const [foods] = useState(MOCK_FOOD);

  return (
    <div className="food-management">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Quản lý Bắp & Nước" },
        ]}
        action={
          <button className="btn-add">
            <span>+</span> Thêm món mới
          </button>
        }
      />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon"><FastfoodIcon /></div>
          <div className="stat-info">
            <span className="stat-label">Tổng sản phẩm</span>
            <span className="stat-value">{foods.length}</span>
          </div>
        </div>
      </div>

      <div className="table-container shadow-premium">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Phân loại</th>
              <th>Giá bán</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((item) => (
              <tr key={item.id}>
                <td className="img-cell">
                  <img src={item.image} alt={item.name} />
                </td>
                <td className="name-cell"><strong>{item.name}</strong></td>
                <td>{item.category}</td>
                <td className="price-cell">
                  {item.price.toLocaleString("vi-VN")} đ
                </td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status === "AVAILABLE" ? "Còn hàng" : "Hết hàng"}
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

export default FoodManagement;
