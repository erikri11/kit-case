import { orderApi } from "@features/orders/api/orderApi";
import type { LineItem } from "@features/orders/models/lineItem.model";
import { BASE_CURRENCY, LOCKED_STATUSES, type OrderStatus } from "@features/orders/models/order.constants";
import type { Order, OrderCreate, OrderFieldName, OrderPaymentMethod, OrderUpdate } from "@features/orders/models/order.model";
import { calculateOrderTotal } from "@features/orders/utils/calculateOrderTotal";
import { createEmptyLineItem } from "@features/orders/utils/createEmptyLineItem";
import { resolveSelectedValue } from "@features/orders/utils/resolveSelectedValue";
import { useProducts } from "@features/products/hooks/useProducts";
import useCurrency from "@shared/context/currency/useCurrency";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useCustomers } from "@shared/hooks/useCustomers";
import type { Mode } from "@shared/types/mode";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UseOrderUpsertDialogProps {
  mode: Mode;
  initialOrder?: Order;
  orderId?: string;
  onClose: () => void;
}

export function useOrderUpsertDialog({ 
  mode, 
  initialOrder, 
  orderId, 
  onClose 
}: UseOrderUpsertDialogProps) {
  
  const { t } = useTranslation(["orders", "common", "products", "validation"]);
  const { setSnackbarMessage } = useSnackbar();
  const customers = useCustomers();
  const products = useProducts();
  const { currency: displayCurrency } = useCurrency();

  const [customerIdOverride, setCustomerIdOverride] = useState<string | undefined>(undefined);
  const customerId = customerIdOverride ?? initialOrder?.customerId ?? "";
  const [status, setStatus] = useState<OrderStatus>(initialOrder?.status ?? "Pending");
  const [submitted, setSubmitted] = useState(false);

  const [issueDate, setIssueDate] = useState<Date>(
    initialOrder?.issueDate ? new Date(initialOrder.issueDate) : new Date()
  );

  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod | undefined>(
    initialOrder?.paymentMethod
  );

  const [lineItems, setLineItems] = useState<LineItem[]>(
    initialOrder?.lineItems?.length ? initialOrder.lineItems : [createEmptyLineItem()]
  );

  const [touched, setTouched] = useState<Record<OrderFieldName, boolean>>({
    customerId: false,
    paymentMethod: false
  });

  const customerError = !customerId ? t("common:validation.customerRequired") : undefined;
  const paymentMethodError = !paymentMethod ? t("common:validation.paymentMethodRequired") : undefined;

  const showCustomerError = !!customerError && (touched.customerId || submitted);
  const showPaymentMethodError = !!paymentMethodError && (touched.paymentMethod || submitted);

  const selectedCustomerId = resolveSelectedValue(customers, customerId);
  
  const totalAmount = calculateOrderTotal(lineItems, BASE_CURRENCY);
  const convertedOrderTotal = calculateOrderTotal(lineItems, displayCurrency);

  const canSubmit = 
    !customerError && 
    !paymentMethodError &&
    lineItems.length > 0 &&
    lineItems.every((item) => item.productId && item.quantity > 0);

  const isMockOrder = Boolean(initialOrder?.isMocked);

  const isOrderLocked =
    mode === "edit" &&
    initialOrder &&
    LOCKED_STATUSES.includes(initialOrder.status);

  const allProductsSelected =
    lineItems.filter((item) => item.productId).length >= products.length;

  function addLineItem() {
    setLineItems((prev) => [...prev, createEmptyLineItem()]);
  };

  function removeLineItem(id: string) {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  function updateLineItemProduct(lineItemId: string, productId: string) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const isAlreadySelectedOnAnotherLine = lineItems.some(
      (item) => item.id !== lineItemId && item.productId === productId
    );

    if (isAlreadySelectedOnAnotherLine) {
      return;
    }

    setLineItems((prev) =>
      prev.map((item) =>
        item.id === lineItemId
          ? {
              ...item,
              productId: product.id,
              productNumber: product.productNumber,
              productName: product.name,
              productImage: product.image,
              quantity: item.quantity || 1,
              currency: product.currency,
              unitAmount: product.price,
              totalAmount: product.price * (item.quantity || 1)
            }
          : item
      )
    );
  };

  function updateLineItemQuantity(lineItemId: string, quantity: number) {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === lineItemId
          ? {
              ...item,
              quantity,
              totalAmount: item.unitAmount * quantity
            }
          : item
      )
    );
  };

  const handleUpsertOrder = async () => {
    setSubmitted(true);

    if (!canSubmit || !paymentMethod) return;

    try {
      if (mode === "add") {
        const payload: OrderCreate = {
          customerId,
          currency: BASE_CURRENCY,
          totalAmount,
          issueDate,
          paymentMethod,
          lineItems
        };

        await orderApi.post(payload);

        setSnackbarMessage({
          content: t("orders:snackbar.addSuccess"),
          type: "success"
        });
      } else {
        if (!orderId) return;

        const payload: OrderUpdate = {
          customerId,
          issueDate,
          paymentMethod,
          status,
          lineItems
        };

        await orderApi.put(orderId, payload);

        setSnackbarMessage({
          content: t("orders:snackbar.updateSuccess"),
          type: "success"
        });
      }

      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error updating order:", errorMessage);

      setSnackbarMessage({
        content:
          mode === "add"
            ? t("orders:snackbar.addError")
            : t("orders:snackbar.updateError"),
        type: "error"
      });
    }
  };

  return {
    t,
    customers,
    issueDate,
    paymentMethod,
    status,
    showCustomerError,
    showPaymentMethodError,
    customerError,
    paymentMethodError,
    canSubmit,
    lineItems,
    products,
    isMockOrder,
    isOrderLocked,
    allProductsSelected,
    selectedCustomerId,
    convertedOrderTotal,
    displayCurrency,
    addLineItem,
    removeLineItem,
    updateLineItemProduct,
    updateLineItemQuantity,
    handleUpsertOrder,
    setCustomerIdOverride,
    setIssueDate,
    setPaymentMethod,
    setStatus,
    setTouched
  };
}

export default useOrderUpsertDialog;
