import { Currency, ProductImage } from "../products/product.model";

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
