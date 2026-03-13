export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  customerId?: string;
  dueDate: Date;
  createdAt: Date;
}

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Todo" | "InProgress" | "Done";
export type TaskFieldName = "title";

// POST payload: server sets id, createdAt
export type TaskCreate = Omit<Task, "id" | "createdAt">;

// PUT payload: partial update, and still server-owned fields cannot be changed
export type TaskUpdate = Partial<Omit<Task, "id" | "createdAt">>;
