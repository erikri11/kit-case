import { CUSTOMER_PAYMENT_STATUS_CONFIG } from "@features/customers/models/constants/customerPaymentStatusConfig.constants";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const customerPaymentRankStatusesCompare = createConfigRankCompare(CUSTOMER_PAYMENT_STATUS_CONFIG);
