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
  
  // Các field phụ của CheckInTokenResponse có thể rớt vào object này
  movieTitle?: string;
  movieName?: string;
  movie?: string;
  showDate?: string;
  date?: string;
  showTime?: string;
  time?: string;
  hallName?: string;
  hall?: string;
  roomName?: string;
  seatNames?: string;
  seatName?: string;
  seats?: string;
  code?: string;
  userName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  price?: number;
  bookingDate?: string;
  tokenStatus?: string;
}
