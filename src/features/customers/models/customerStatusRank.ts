import type { CustomerStatus } from "./customer.model";

export const CUSTOMER_STATUS_RANK: Record<CustomerStatus, number> = {
  Active: 1,
  Pending: 2,
  Blocked: 3
};
