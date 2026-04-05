import type { OrderStatus } from "./order.model";

export const ORDER_STATUS_RANK: Record<OrderStatus, number> = {
  Completed: 1,
  Pending: 2,
  Rejected: 3,
  Canceled: 4,
  Refunded: 5
};
