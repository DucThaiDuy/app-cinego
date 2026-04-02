export interface ShowTimeResponse {
  id: number;
  movieId: number;
  hallId: number;
  cinemaId: number;
  
  posterUrl: string;
  movieTitle: string;
  cinemaName: string;
  hallName: string;

  date: string; // yyyy-MM-dd
  time: string; // HH:mm:ss
  showDatetime?: string;

  format: string;
  language: string;

  availableSeats: string | number;
  status: string;
}
