import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Customer } from "@features/customers/models/model/customer.model";
import { CUSTOMER_STATUS_CONFIG } from "@features/customers/models/constants/customerStatusConfig.constants";
import type { CustomerStatus } from "@features/customers/models/constants/customer.constants";

export const CustomerStatusChipRenderer =
  createChipRenderer<Customer, CustomerStatus>(CUSTOMER_STATUS_CONFIG);

export default CustomerStatusChipRenderer;
