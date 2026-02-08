export type Showtime = {
  id: number;
  posterUrl: string;
  movie_title: string; // join từ movies
  cinema_name: string; // join từ cinemas
  hall_name: string; // join từ halls
  show_date: string;
  show_time: string;
  format: "2D" | "3D" | "IMAX" | "4DX";
  language: "subtitle" | "dubbed";
  available_seats: number;
  status: "available" | "full" | "cancelled" | "ended";
};
