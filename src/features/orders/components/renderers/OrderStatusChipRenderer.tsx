import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Order } from "@features/orders/models/order.model";
import { ORDER_STATUS_CONFIG } from "@features/orders/models/orderStatusConfig";
import type { OrderStatus } from "@features/orders/models/order.constants";

export const OrderStatusChipRenderer =
  createChipRenderer<Order, OrderStatus>(ORDER_STATUS_CONFIG);

export default OrderStatusChipRenderer;
