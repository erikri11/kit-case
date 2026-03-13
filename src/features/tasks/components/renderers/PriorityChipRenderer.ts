import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Task, TaskPriority } from "@features/tasks/models/task.model";
import { TASK_PRIORITY_CONFIG } from "@features/tasks/models/taskPriorityConfig";

export const PriorityChipRenderer =
  createChipRenderer<Task, TaskPriority>(TASK_PRIORITY_CONFIG);
  