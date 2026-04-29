import type { CustomerDetails } from "@features/customers/models/model/customer.details.model";
import useCurrency from "@shared/context/currency/useCurrency";
import { formatPrice } from "@shared/utils/formatPrice";
import { useTranslation } from "react-i18next";

interface UseCustomerPaymentsCardProps {
  customer: CustomerDetails;
}

export function useCustomerPaymentsCard({ 
  customer 
}: UseCustomerPaymentsCardProps) {

  const { t, i18n } = useTranslation(["common", "orders"]);
  const { currency: displayCurrency } = useCurrency();

  const paymentSummary = customer.paymentSummary;
  const language = i18n.language;
  const totalOrders = customer.orders.length;

  const ordersNetBase =
    paymentSummary.ordersValueBase - paymentSummary.refundsValueBase;

  const statusCounts = customer.orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusText = Object.entries(statusCounts)
    .filter(([status]) => status !== "Completed")
    .map(([status, count]) => `${count} ${t(`orders:status.${status}`)}`)
    .join(", ");

  const ordersLabel = statusText
    ? `${totalOrders} (${statusText})`
    : `${totalOrders}`;

  const formattedOrdersNet = formatPrice(
    ordersNetBase,
    paymentSummary.baseCurrency,
    displayCurrency,
    language
  );

  const formattedRefunds = formatPrice(
    paymentSummary.refundsValueBase,
    paymentSummary.baseCurrency,
    displayCurrency,
    language
  );

  return {
    t,
    ordersLabel,
    formattedOrdersNet,
    formattedRefunds
  };
}
