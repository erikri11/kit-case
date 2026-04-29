import type { LineItem } from "@features/orders/models/model/lineItem.model";
import type { Currency } from "@features/products/models/product.constants";
import { convertToBaseCurrency } from "@shared/utils/convertToBaseCurrency";

export function calculateOrderTotal(
  lineItems: LineItem[],
  targetCurrency: Currency
): number {

  return lineItems.reduce((sum, item) => {
    if (!item.currency) return sum;

    return sum + convertToBaseCurrency(
      item.totalAmount,
      item.currency,
      targetCurrency
    );
  }, 0);
}
