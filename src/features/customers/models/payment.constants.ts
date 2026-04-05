export const PAYMENT_STATUSES = ["Pending", "Completed", "Refunded"] as const;
export type PaymentStatus  = (typeof PAYMENT_STATUSES)[number];
