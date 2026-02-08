// types/Cinema.ts
export type CinemaStatus = "ALL" | "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export type Cinema = {
  id?: number;
  code?: string;
  name?: string;
  address?: string;
  ward?: string;
  district?: string;
  city?: string;
  phone?: string;
  email?: string;
  opening_time?: string;
  closing_time?: string;
  description?: string;
  status?: CinemaStatus;
};
