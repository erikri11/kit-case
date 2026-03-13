import { CUSTOMER_STATUS_RANK } from "@features/customers/models/customerStatusRank";
import { createRankCompare } from "@shared/utils/createRankCompare";

export const customerStatusRankCompare = createRankCompare(CUSTOMER_STATUS_RANK);
