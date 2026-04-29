import { v4 as uuidv4 } from "uuid";
import type { Task, TaskCreate, TaskUpdate } from "./task.model";
import { mockTasks } from "./task.mock";

let tasks: Task[] = [...mockTasks];

export function listTasks(): Task[] {
  return tasks;
};

export function getTask(id: string): Task | null {
  return tasks.find((x) => x.id === id) ?? null;
};

export function createTask(input: TaskCreate): Task {
  const task: Task = {
    id: uuidv4(),
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    priority: input.priority,
    status: "Todo",
    createdAt: new Date(),
    dueDate: new Date(input.dueDate)
  };

  tasks.unshift(task);
  return task;
};

export function updateTask(id: string, input: TaskUpdate): Task | null {
  const index = tasks.findIndex((x) => x.id === id);
  if (index < 0) return null;

  const updatedTask: Task = {
    ...tasks[index],
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    priority: input.priority,
    status: input.status,
    dueDate: new Date(input.dueDate)
  };

  tasks[index] = updatedTask;
  return updatedTask;
};

export function deleteTask(id: string): boolean {
  const before = tasks.length;
  tasks = tasks.filter((x) => x.id !== id);
  return tasks.length !== before;
};
