import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { StatusConfigItem } from "@shared/models/model/statusConfigItem.model";
import type { TaskStatus } from "./task.model";

export const TASK_STATUS_CONFIG: Record<TaskStatus, StatusConfigItem> = {
  Todo: {
    labelKey: "tasks:status.Todo",
    icon: RadioButtonUncheckedIcon,
    color: "error",
    rank: 0
  },
  InProgress: {
    labelKey: "tasks:status.InProgress",
    icon: AutorenewIcon,
    color: "warning",
    rank: 1
  },
  Done: {
    labelKey: "tasks:status.Done",
    icon: CheckCircleIcon,
    color: "success",
    rank: 2
  }
};
