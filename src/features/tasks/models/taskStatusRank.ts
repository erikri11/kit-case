import type { TaskStatus } from "./task.model";

export const TASK_STATUS_RANK: Record<TaskStatus, number> = {
  Todo: 1,
  InProgress: 2,
  Done: 3
};
