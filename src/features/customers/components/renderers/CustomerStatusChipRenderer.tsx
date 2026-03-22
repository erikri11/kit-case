import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Customer, CustomerStatus } from "@features/customers/models/customer.model";
import { CUSTOMER_STATUS_CONFIG } from "@features/customers/models/customerStatusConfig";

export const CustomerStatusChipRenderer =
  createChipRenderer<Customer, CustomerStatus>(CUSTOMER_STATUS_CONFIG);
  