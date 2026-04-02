// BookingStatus.ts
export const BookingStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  USED: "USED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
