export const PRIORITY_ORDER = [
  "Low", 
  "Medium", 
  "High"
] as const;

export type Priority = (typeof PRIORITY_ORDER)[number];
