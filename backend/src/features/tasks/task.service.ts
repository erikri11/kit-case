import { v4 as uuidv4 } from "uuid";
import type { Task } from "./task.model";
import { mockTasks } from "./task.mock";

let tasks: Task[] = [...mockTasks];

export function listTasks(): Task[] {
  return tasks;
};

export function getTask(id: string): Task | null {
  return tasks.find((x) => x.id === id) ?? null;
};

export function createTask(input: {
  title: string;
  description?: string;
  priority: Task["priority"];
  status: Task["status"];
}): Task {

  const { 
    title, 
    description, 
    priority 
  } = input;

  const task: Task = {
    id: uuidv4(),
    title: title.trim(),
    description: description?.trim() || undefined,
    priority,
    status: "Todo",
    createdAt: new Date(),
    dueDate: new Date()
  };

  tasks.unshift(task);

  return task;
};

export function updateTask(
  id: string,
  input: {
    title: string;
    description?: string;
    priority: Task["priority"];
    status: Task["status"];
    dueDate: Date;
  }
): Task | null {

  const index = tasks.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const { 
    title, 
    description, 
    priority, 
    status, 
    dueDate 
  } = input;

  const updatedTask: Task = {
    ...tasks[index],
    title: title.trim(),
    description: description?.trim() || undefined,
    priority,
    status,
    dueDate: dueDate
  };

  tasks[index] = updatedTask;

  return updatedTask;
};

export function deleteTask(id: string): boolean {
  const before = tasks.length;
  tasks = tasks.filter((x) => x.id !== id);
  return tasks.length !== before;
};
