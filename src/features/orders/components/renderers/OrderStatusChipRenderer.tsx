import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Order, OrderStatus } from "@features/orders/models/order.model";
import { ORDER_STATUS_CONFIG } from "@features/orders/models/orderStatusConfig";

export const OrderStatusChipRenderer =
  createChipRenderer<Order, OrderStatus>(ORDER_STATUS_CONFIG);
  