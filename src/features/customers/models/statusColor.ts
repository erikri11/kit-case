import type { Status } from "./status";

export const STATUS_COLOR: Record<Status, 'success' |'warning' | 'error'  > = {
  Active: 'success',
  Pending: 'warning',
  Blocked: 'error'
};
