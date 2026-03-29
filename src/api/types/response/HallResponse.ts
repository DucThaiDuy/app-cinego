export interface HallResponse {
  id: number;
  cinemaId: number;
  cinemaName?: string;
  name: string;
  hallType: "STANDARD" | "VIP" | "IMAX" | "FOUR_DX";
  totalSeats: number;
  totalRows: number;
  seatsPerRow: number;
  seatLayout: any; // Mảng ghế hoặc chuỗi JSON tùy BE cấu hình trả về
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  createdAt?: string;
  updatedAt?: string;
}
