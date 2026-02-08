export const CINEMA_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  MAINTENANCE: "MAINTENANCE",
} as const;

export type CINEMA_STATUS = (typeof CINEMA_STATUS)[keyof typeof CINEMA_STATUS];
