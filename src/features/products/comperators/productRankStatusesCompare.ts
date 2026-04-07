import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";
import { PRODUCT_STATUS_CONFIG } from "../models/productStatusConfig";

export const productRankStatusesCompare = createConfigRankCompare(PRODUCT_STATUS_CONFIG);
