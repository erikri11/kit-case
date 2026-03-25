import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BlockIcon from "@mui/icons-material/Block";
import type { CustomerStatus } from "./customer.model";
import type { StatusConfigItem } from "@shared/types/statusConfigItem";

export const CUSTOMER_STATUS_CONFIG: Record<CustomerStatus, StatusConfigItem> = {
  Active: {
    labelKey: "customers:status.customers.Active",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Pending: {
    labelKey: "customers:status.customers.Pending",
    icon: ScheduleIcon,
    color: "warning",
    rank: 1
  },
  Blocked: {
    labelKey: "customers:status.customers.Blocked",
    icon: BlockIcon,
    color: "error",
    rank: 2
  }
};
