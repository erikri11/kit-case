export const CUSTOMER_PAYMENT_STATUSES = [
  "Pending", 
  "Completed", 
  "Refunded"
] as const;

export type PaymentStatus  = (typeof CUSTOMER_PAYMENT_STATUSES)[number];
