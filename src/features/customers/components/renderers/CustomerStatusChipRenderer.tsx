import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Customer } from "@features/customers/models/customer.model";
import { CUSTOMER_STATUS_CONFIG } from "@features/customers/models/customerStatusConfig";
import type { CustomerStatus } from "@features/customers/models/customer.constants";

export const CustomerStatusChipRenderer =
  createChipRenderer<Customer, CustomerStatus>(CUSTOMER_STATUS_CONFIG);

export default CustomerStatusChipRenderer;
