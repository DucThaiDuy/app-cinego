export interface ShowTimeResponse {
  id: number;
  posterUrl: string;

  movie_title: string;
  cinema_name: string;
  hall_name: string;

  date: string; // yyyy-MM-dd
  time: string; // HH:mm

  format: string;
  language: string;

  availableSeats: number;
  status: string;
}
