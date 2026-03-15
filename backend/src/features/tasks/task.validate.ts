import type { Task, TaskPriority, TaskStatus } from "./task.model";

const validPriorities: TaskPriority[] = ["Low", "Medium", "High"];
const validStatuses: TaskStatus[] = ["Todo", "InProgress", "Done"];

export function validateCreate(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  
  const data = body as Partial<Task>;
  const { title, description, priority, status } = data;
  
  if (!title || typeof title !== "string" || !title.trim()) return "Title is required";
  if (description !== undefined && typeof description !== "string") return "Description must be a string";
  if (!validPriorities.includes(priority as TaskPriority)) return "Invalid priority";
  if (!validStatuses.includes(status as TaskStatus)) return "Invalid status";

  return null;
}

export function validateUpdate(body: unknown, partial = false): string | null {
  if (!body || typeof body !== "object") return "Invalid body";
  if (!partial) return validateCreate(body);
  
  const data = body as Partial<Task>;
  const { title, description, priority, status } = data;

  if (title !== undefined && (!title || typeof title !== "string" || !title.trim())) return "Title is required";
  if (description !== undefined && typeof description !== "string") return "Description must be a string";
  if (priority !== undefined && !validPriorities.includes(priority)) return "Invalid priority";
  if (status !== undefined && !validStatuses.includes(status)) return "Invalid status";
  
  return null;
}
