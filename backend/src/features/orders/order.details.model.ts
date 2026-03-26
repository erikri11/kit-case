import type { Order } from "./order.model";

export interface OrderCustomerInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface OrderDetails extends Order {
  customer: OrderCustomerInfo;
}
