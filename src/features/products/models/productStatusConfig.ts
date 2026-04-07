import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { ProductStatus } from "./product.constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const PRODUCT_STATUS_CONFIG: Record<ProductStatus, StatusConfigItem> = {
  Published: {
    labelKey: "products:status.Published",
    icon: CheckCircleIcon,
    color: "success",
    rank: 0
  },
  Draft: {
    labelKey: "products:status.Draft",
    icon: AccessTimeIcon,
    color: "warning",
    rank: 1
  }
}
