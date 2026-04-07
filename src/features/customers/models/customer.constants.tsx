export const CUSTOMER_STATUSES = ['Active', 'Blocked'] as const;
export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];
