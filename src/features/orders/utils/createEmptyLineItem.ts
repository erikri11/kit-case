import type { LineItem } from "../models/model/lineItem.model";

export function createEmptyLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    productId: "",
    productNumber: "",
    productName: "",
    productImage: null,
    quantity: 1,
    currency: "USD",
    unitAmount: 0,
    totalAmount: 0
  };
}
