import type { Order } from "./order.model";
import type { CustomerStatus } from "@features/customers/models/constants/customer.constants";

export interface OrderCustomerInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: CustomerStatus;
}

export interface OrderDetails extends Order {
  customer: OrderCustomerInfo;
}
