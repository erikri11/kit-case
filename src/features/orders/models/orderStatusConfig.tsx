import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UndoIcon from "@mui/icons-material/Undo";
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { OrderStatus } from "./order.constants";

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfigItem> = {
  Completed: {
    labelKey: "orders:status.Completed",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Pending: {
    labelKey: "orders:status.Pending",
    icon: ScheduleIcon,
    color: "warning",
    rank: 1
  },
  Refunded: {
    labelKey: "orders:status.Refunded",
    icon: UndoIcon,
    color: "info",
    rank: 2
  }
};
