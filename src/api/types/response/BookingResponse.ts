import { BookingStatus } from "../../../components/ENUM/BookingStatus.enum";
import { PaymentMethod } from "../../../components/ENUM/PaymentMethod.enum";

export interface BookingResponse {
  id: number;
  bookingCode: string;

  customerName: string;
  customerEmail: string;
  customerPhone: string;

  ticketPrice: number;
  comboPrice: number;
  discountAmount: number;
  pointsUsed: number;
  totalAmount: number;
  createdAt: string;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
}
