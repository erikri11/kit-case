import { ORDER_STATUS_RANK } from "@features/orders/models/orderStatusRank";
import { createRankCompare } from "@shared/utils/createRankCompare";

export const orderStatusRankCompare = createRankCompare(ORDER_STATUS_RANK);
