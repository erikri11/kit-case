import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";
import type { StatusConfigItem } from "@shared/models/model/statusConfigItem.model";
import type { TaskPriority } from "./task.model";

export const TASK_PRIORITY_STATUS_CONFIG: Record<TaskPriority, StatusConfigItem> = {
  Low: {
    labelKey: "tasks:priority.Low",
    icon: OutlinedFlagIcon,
    color: "success",
    rank: 0
  },
  Medium: {
    labelKey: "tasks:priority.Medium",
    icon: FlagIcon,
    color: "warning",
    rank: 1
  },
  High: {
    labelKey: "tasks:priority.High",
    icon: FlagIcon,
    color: "error",
    rank: 2
  }
};
