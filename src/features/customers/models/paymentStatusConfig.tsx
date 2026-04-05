import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ReplayIcon from "@mui/icons-material/Replay";
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { PaymentStatus } from "./payment.constants";

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, StatusConfigItem> = {
  Completed: {
    labelKey: "customers:status.payments.Completed",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Pending: {
    labelKey: "customers:status.payments.Pending",
    icon: ScheduleIcon,
    color: "warning",
    rank: 1
  },
  Refunded: {
    labelKey: "customers:status.payments.Refunded",
    icon: ReplayIcon,
    color: "info",
    rank: 2
  }
};
