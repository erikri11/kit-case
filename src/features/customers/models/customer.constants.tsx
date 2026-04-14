export const CUSTOMER_STATUSES = [
  'Active', 
  'Blocked'
] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];

export const CUSTOMER_QUOTAS = [
  '0', 
  '50', 
  '100'
] as const;

export type CustomerQuota = (typeof CUSTOMER_QUOTAS)[number];
