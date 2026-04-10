import type { StatusConfigItem } from "@shared/types/statusConfigItem";
import type { ProductStatus } from "./product.constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArchiveIcon from "@mui/icons-material/Archive";

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
  },
  Archived: {
    labelKey: "products:status.Archived",
    icon: ArchiveIcon,
    color: "default",
    rank: 2
  }
}
