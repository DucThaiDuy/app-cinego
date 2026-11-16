import React, { useState } from "react";
import PageHeader from "../../UI/PageHearder/PageHeader";
import { MOCK_VOUCHERS } from "../../../api/service/mock/mockData";
import TooltipIconButton from "../../UI/TooltipIconButtonProps";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import "./VoucherManagement.scss";

const VoucherManagement = () => {
  const [vouchers] = useState(MOCK_VOUCHERS);

  return (
    <div className="voucher-management">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/cinego/admin/dashboard" },
          { label: "Quản lý Khuyến mãi" },
        ]}
        action={
          <button className="btn-add">
            <span>+</span> Tạo Voucher
          </button>
        }
      />

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon"><CardGiftcardIcon /></div>
          <div className="stat-info">
            <span className="stat-label">Voucher đang chạy</span>
            <span className="stat-value">{vouchers.filter(v => v.status === "ACTIVE").length}</span>
          </div>
        </div>
      </div>

      <div className="table-container shadow-premium">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Mã Code</th>
              <th>Mô tả</th>
              <th>Giá trị</th>
              <th>Hết hạn</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((v) => (
              <tr key={v.id}>
                <td className="code-cell">
                   <div className="voucher-code">{v.code}</div>
                </td>
                <td>{v.description}</td>
                <td>
                  {v.discountType === "PERCENTAGE" ? `${v.value}%` : `${v.value.toLocaleString("vi-VN")}đ`}
                </td>
                <td>{v.expiryDate}</td>
                <td>
                  <span className={`status-pill ${v.status.toLowerCase()}`}>
                    {v.status === "ACTIVE" ? "Đang áp dụng" : "Hết hạn"}
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

export default VoucherManagement;
