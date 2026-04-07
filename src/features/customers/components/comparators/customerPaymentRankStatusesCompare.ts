import { CUSTOMER_PAYMENT_STATUS_CONFIG } from "@features/customers/models/customerPaymentStatusConfig";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const customerPaymentRankStatusesCompare = createConfigRankCompare(CUSTOMER_PAYMENT_STATUS_CONFIG);
