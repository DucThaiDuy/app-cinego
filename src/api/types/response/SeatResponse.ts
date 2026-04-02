export interface SeatResponse {
  id: number;
  rowName: string;
  seatNumber: number;
  seatCode: string; // ví dụ: "A1"
  seatType: string; // ví dụ: "NORMAL", "VIP"
  basePrice: number;
  isBooked: boolean;
}
