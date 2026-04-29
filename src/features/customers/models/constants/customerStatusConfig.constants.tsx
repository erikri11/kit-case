import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import type { StatusConfigItem } from "@shared/models/model/statusConfigItem.model";
import type { CustomerStatus } from "./customer.constants";

export const CUSTOMER_STATUS_CONFIG: Record<CustomerStatus, StatusConfigItem> = {
  Active: {
    labelKey: "customers:status.customers.Active",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Blocked: {
    labelKey: "customers:status.customers.Blocked",
    icon: BlockIcon,
    color: "error",
    rank: 1
  }
};
