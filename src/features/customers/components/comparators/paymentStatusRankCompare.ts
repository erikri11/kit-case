import { PAYMENT_STATUS_RANK } from "@features/customers/models/paymentStatusRank";
import { createRankCompare } from "@shared/utils/createRankCompare";

export const paymentStatusRankCompare = createRankCompare(PAYMENT_STATUS_RANK);
