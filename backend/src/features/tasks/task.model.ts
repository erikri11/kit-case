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

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = "Todo" | "InProgress" | "Done";
