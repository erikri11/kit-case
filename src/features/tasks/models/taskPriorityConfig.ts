import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { TaskPriority } from "./task.model";

export const TASK_PRIORITY_CONFIG: Record<TaskPriority, StatusConfigItem> = {
  Low: {
    labelKey: "tasks:priority.low",
    icon: PriorityHighIcon,
    color: "success",
    rank: 0
  },
  Medium: {
    labelKey: "tasks:priority.medium",
    icon: PriorityHighIcon,
    color: "warning",
    rank: 1
  },
  High: {
    labelKey: "tasks:priority.high",
    icon: PriorityHighIcon,
    color: "error",
    rank: 2
  }
};
