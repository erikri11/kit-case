import type { PaymentStatus } from "@features/customers/models/customer.payment.model";

export const PAYMENT_STATUS_RANK: Record<PaymentStatus, number> = {
  Completed: 1,
  Pending: 2,
  Failed: 3,
  Refunded: 4
};
