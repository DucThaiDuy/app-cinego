import { BookingStatus } from "../../../components/ENUM/BookingStatus.enum";
import { PaymentMethod } from "../../../components/ENUM/PaymentMethod.enum";

export interface BookingRequest {
  userId: number;
  showtimeId: number;

  ticketPrice: number;
  comboPrice: number;
  discountAmount: number;
  pointsUsed: number;
  totalAmount: number;

  status: BookingStatus;
  paymentMethod: PaymentMethod;
}
