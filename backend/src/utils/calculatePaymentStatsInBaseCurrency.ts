import { Currency } from "../features/products/product.model";
import { convertToBaseCurrency } from "./convertToBaseCurrency";

interface PaymentLike {
  amount: number;
  currency: Currency;
  status: string;
}

export function calculatePaymentStatsInBaseCurrency(
  payments: PaymentLike[],
  baseCurrency: Currency = "NOK"
) {
  const refundsValueBase = payments
    .filter((payment) => payment.status === "Refunded")
    .reduce((sum, payment) => {
      return sum + convertToBaseCurrency(payment.amount, payment.currency, baseCurrency);
    }, 0);

  return {
    refundsValueBase,
    baseCurrency
  };
}
