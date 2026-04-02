// PaymentMethod.ts
export const PaymentMethod = {
  ATM: "ATM",
  VISA: "VISA",
  MOMO: "MOMO",
  ZALOPAY: "ZALOPAY",
  VNPAY: "VNPAY",
  BANK_TRANSFER: "BANK_TRANSFER",
  CASH: "CASH",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
