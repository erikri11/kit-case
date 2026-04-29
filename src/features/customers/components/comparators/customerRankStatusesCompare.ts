import { CUSTOMER_STATUS_CONFIG } from "@features/customers/models/constants/customerStatusConfig.constants";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const customerRankStatusesCompare = createConfigRankCompare(CUSTOMER_STATUS_CONFIG);
