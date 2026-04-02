import { BookingStatus } from "../../api/types/enum/BookingStatus";
import { PaymentMethod } from "../../api/types/enum/PaymentMethod";

export interface Booking {
  id: number;
  booking_code: string;
  user_id?: number;
  showtime_id: number;
  voucher_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  ticket_price: number;
  combo_price: number;
  discount_amount: number;
  points_used: number;
  total_amount: number;
  status: BookingStatus;
  payment_method: PaymentMethod;
  checked_in_at?: string;
  checked_in_by?: number;
  created_at: string;
  updated_at: string;
}
