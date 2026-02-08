import React from "react";

export type Booking = {
  id: number;
  booking_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  status: "pending" | "paid" | "used" | "cancelled" | "refunded";
  payment_method:
    | "atm"
    | "visa"
    | "momo"
    | "zalopay"
    | "vnpay"
    | "bank_transfer"
    | "cash";
  created_at: string;
};

type BookingTableProps = {
  bookings: Booking[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onCheckin?: (id: number) => void;
};

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onEdit,
  onDelete,
  onCheckin,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Mã booking</th>
          <th>Khách hàng</th>
          <th>Email</th>
          <th>Điện thoại</th>
          <th>Thanh toán</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.id}>
            <td>{b.booking_code}</td>
            <td>{b.customer_name}</td>
            <td>{b.customer_email}</td>
            <td>{b.customer_phone}</td>
            <td>{b.payment_method}</td>
            <td>{b.total_amount.toLocaleString()}₫</td>
            <td>
              <span className={`status-badge ${b.status}`}>{b.status}</span>
            </td>
            <td>{new Date(b.created_at).toLocaleDateString()}</td>
            <td className="actions">
              {onEdit && (
                <button className="edit" onClick={() => onEdit(b.id)}>
                  Sửa
                </button>
              )}
              {onDelete && (
                <button className="delete" onClick={() => onDelete(b.id)}>
                  Xóa
                </button>
              )}
              {onCheckin && b.status === "paid" && (
                <button className="checkin" onClick={() => onCheckin(b.id)}>
                  Check-in
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
