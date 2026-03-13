import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { TaskStatus } from "./task.model";

export const TASK_STATUS_CONFIG: Record<TaskStatus, StatusConfigItem> = {
  Todo: {
    labelKey: "tasks:status.todo",
    icon: CircleIcon,
    color: "error",
    rank: 0
  },
  InProgress: {
    labelKey: "tasks:status.inProgress",
    icon: HourglassEmptyIcon,
    color: "warning",
    rank: 1
  },
  Done: {
    labelKey: "tasks:status.done",
    icon: CheckCircleIcon,
    color: "success",
    rank: 2
  }
};
