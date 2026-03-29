export interface ShowTimeResponse {
  id: number;
  posterUrl: string;
  movie_title: string;
  cinema_name: string;
  hall_name: string;

  date: string; // yyyy-MM-dd
  time: string; // HH:mm:ss

  format: string;
  language: string;

  available_seats: string | number;
  status: string;
}
