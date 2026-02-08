// BookingStatus.ts
export const BookingStatus = {
  PENDING: "pending",
  PAID: "paid",
  USED: "used",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
