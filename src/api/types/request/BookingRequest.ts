import { BookingStatus } from "../enum/BookingStatus";
import { PaymentMethod } from "../enum/PaymentMethod";

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
  seats: Array<{ seatId: number; price: number }>;
}
