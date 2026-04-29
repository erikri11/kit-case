import { createChipRenderer } from "@shared/renderers/createChipRenderer";
import type { Order } from "@features/orders/models/model/order.model";
import { ORDER_STATUS_CONFIG } from "@features/orders/models/constants/orderStatusConfig.constants";
import type { OrderStatus } from "@features/orders/models/constants/order.constants";

export const OrderStatusChipRenderer =
  createChipRenderer<Order, OrderStatus>(ORDER_STATUS_CONFIG);

export default OrderStatusChipRenderer;
