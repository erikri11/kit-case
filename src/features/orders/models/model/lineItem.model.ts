import type { Currency } from "@features/products/models/product.constants";
import type {  ProductImage } from "@features/products/models/product.model";

export interface LineItem {
  id: string;
  productId: string;
  productNumber: string;
  productName: string;
  productImage: ProductImage | null;
  quantity: number;
  currency: Currency;
  unitAmount: number;
  totalAmount: number;
}
