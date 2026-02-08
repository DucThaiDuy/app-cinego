export type MovieResponse = {
  id: number;

  // Phim
  title: string;
  originalTitle: string;

  // Thời lượng (phút)
  durationMinutes: number;

  // Độ tuổi
  ageRating: string;
  posterUrl: string;
  releaseDate: string;
  country: string;
  distributor: string;
  // Rating (ưu tiên userRating, fallback imdbRating)
  rating: number;

  // Trạng thái (COMING_SOON / SHOWING / ENDED)
  status: string;

  // Nổi bật
  isFeatured: boolean;
};
