import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import { TASK_STATUS_CONFIG } from "@features/tasks/models/taskStatusConfig";
import type { Task, TaskStatus } from "@features/tasks/models/task.model";

export const TaskStatusChipRenderer =
  createChipRenderer<Task, TaskStatus>(TASK_STATUS_CONFIG);
  