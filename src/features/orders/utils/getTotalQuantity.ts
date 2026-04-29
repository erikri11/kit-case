import type { LineItem } from "../models/model/lineItem.model";

export function getTotalQuantity(lineItems: LineItem[]) {
  return lineItems.reduce((sum, item) => sum + item.quantity, 0);
}
