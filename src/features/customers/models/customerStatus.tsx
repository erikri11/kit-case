export const CUSTOMER_STATUS_ORDER = ['Active', 'Pending', 'Blocked'] as const;
export type CustomerStatus = (typeof CUSTOMER_STATUS_ORDER)[number];
