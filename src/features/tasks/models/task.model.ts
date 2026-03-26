import type { BaseEntity } from "@shared/types/baseEntity";

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  customerId?: string;
  dueDate: Date;
}

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Todo" | "InProgress" | "Done";

// Utgår??
export type TaskFieldName = "title";

export type TaskCreate = Pick<Task, "title" | "description" | "priority" | "status" | "dueDate">;
export type TaskUpdate = Pick<Task, "title" | "description" | "priority" | "status" | "dueDate">;
