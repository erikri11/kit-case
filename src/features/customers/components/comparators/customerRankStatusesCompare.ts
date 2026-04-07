import { CUSTOMER_STATUS_CONFIG } from "@features/customers/models/customerStatusConfig";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const customerRankStatusesCompare = createConfigRankCompare(CUSTOMER_STATUS_CONFIG);
