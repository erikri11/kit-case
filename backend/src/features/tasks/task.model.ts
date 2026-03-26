export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
};

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = "Todo" | "InProgress" | "Done";

export type TaskCreate = Pick<Task, "title" | "description" | "priority" | "status" | "dueDate">;
export type TaskUpdate = TaskCreate;
