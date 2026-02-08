// PaymentMethod.ts
export const PaymentMethod = {
  ATM: "atm",
  VISA: "visa",
  MOMO: "momo",
  ZALOPAY: "zalopay",
  VNPAY: "vnpay",
  BANK_TRANSFER: "bank_transfer",
  CASH: "cash",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
