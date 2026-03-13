import type { CustomerStatus } from "./customer.model";
import BlockIcon from "@mui/icons-material/Block";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { StatusConfigItem } from "@shared/types/statusConfigItem";

export const CUSTOMER_STATUS_CONFIG: Record<CustomerStatus, StatusConfigItem> = {
  Active: {
    labelKey: "customers:statusActive",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Pending: {
    labelKey: "customers:statusPending",
    icon: HourglassEmptyIcon,
    color: "warning",
    rank: 1
  },
  Blocked: {
    labelKey: "customers:statusBlocked",
    icon: BlockIcon,
    color: "error",
    rank: 2
  }
};
