import { ORDER_STATUS_CONFIG } from "@features/orders/models/orderStatusConfig";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const orderRankStatusesCompare = createConfigRankCompare(ORDER_STATUS_CONFIG);
