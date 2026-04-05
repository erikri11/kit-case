import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import UndoIcon from "@mui/icons-material/Undo";
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { OrderStatus } from "./order.model";

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
  Rejected: {
    labelKey: "orders:status.Rejected",
    icon: BlockIcon,
    color: "error",
    rank: 2
  },
  Canceled: {
    labelKey: "orders:status.Canceled",
    icon: CancelIcon,
    color: "error",
    rank: 3
  },
  Refunded: {
    labelKey: "orders:status.Refunded",
    icon: UndoIcon,
    color: "info",
    rank: 4
  }
};
