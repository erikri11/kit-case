import { CustomerStatus } from "../customers/customer.model";
import type { Order } from "./order.model";

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
