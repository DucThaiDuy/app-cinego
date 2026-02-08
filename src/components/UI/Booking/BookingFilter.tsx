import React from "react";

type BookingFilterProps = {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

const BookingFilter: React.FC<BookingFilterProps> = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên khách/mã booking"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">Tất cả trạng thái</option>
        <option value="pending">Chờ thanh toán</option>
        <option value="paid">Đã thanh toán</option>
        <option value="used">Đã sử dụng</option>
        <option value="cancelled">Hủy</option>
        <option value="refunded">Hoàn tiền</option>
      </select>
    </div>
  );
};

export default BookingFilter;
