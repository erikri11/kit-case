import { BaseEntity } from "../../shared/types/BaseEntity";

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
};

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = "Todo" | "InProgress" | "Done";

export type TaskCreate = Pick<Task, "title" | "description" | "priority" | "status" | "dueDate">;
export type TaskUpdate = TaskCreate;
