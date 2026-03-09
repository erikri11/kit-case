export const STATUS_ORDER = ['Active', 'Pending', 'Blocked'] as const;
export type Status = (typeof STATUS_ORDER)[number];
