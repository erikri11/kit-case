import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorIcon from "@mui/icons-material/Error";
import ReplayIcon from "@mui/icons-material/Replay";
import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { PaymentStatus } from "./customer.payment.model";

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
  Failed: {
    labelKey: "customers:status.payments.Failed",
    icon: ErrorIcon,
    color: "error",
    rank: 2
  },
  Refunded: {
    labelKey: "customers:status.payments.Refunded",
    icon: ReplayIcon,
    color: "error",
    rank: 3
  }
};
