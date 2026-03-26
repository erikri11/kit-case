let taskCounter = 6;

export function generateTaskNumber(): string {
  return `TASK-${String(taskCounter++).padStart(4, "0")}`;
}
