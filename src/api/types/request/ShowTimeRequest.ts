export interface ShowTimeRequest {
  movieId: number;
  hallId: number;
  showDate: string; // yyyy-MM-dd
  showTime: string; // HH:mm
  format: string; // "STANDARD" | "VIP" | "IMAX" | "FOUR_DX"
  language: string; // "SUBTITLE" | "DUBBED"
  availableSeats?: number;
  status?: string; // "AVAILABLE" | "FULL" | "CANCELLED" | "ENDED"
}
