export interface CinemaRequest {
  name: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  phone: string;
  email?: string;
  openingTime: string; // "HH:mm"
  closingTime: string; // "HH:mm"
  status: string; // "ACTIVE" | "INACTIVE"
}
