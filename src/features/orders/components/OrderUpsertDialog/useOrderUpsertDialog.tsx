import { orderApi } from "@features/orders/api/orderApi";
import type { Order, OrderCreate, OrderFieldName, OrderPaymentMethod, OrderStatus, OrderUpdate } from "@features/orders/models/order.model";
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
  orderId, onClose 
}: UseOrderUpsertDialogProps) {
  
  const { t } = useTranslation(["orders", "common", "validation"]);
  const { setSnackbarMessage } = useSnackbar();
  const customers = useCustomers();

  const matchedCustomer = customers.find(
    (c) => c.name === initialOrder?.name && c.email === initialOrder?.email
  );

  const [customerIdOverride, setCustomerIdOverride] = useState<string | undefined>(undefined);
  const customerId = customerIdOverride ?? matchedCustomer?.id ?? "";

  const [issueDate, setIssueDate] = useState<Date>(
    initialOrder?.issueDate ? new Date(initialOrder.issueDate) : new Date()
  );
  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod | undefined>(
    initialOrder?.paymentMethod
  );
  const [status, setStatus] = useState<OrderStatus>(initialOrder?.status ?? "Pending");
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<OrderFieldName, boolean>>({
    customerId: false,
    paymentMethod: false
  });

  const customerError = !customerId ? t("common:validation.customerRequired") : undefined;
  const paymentMethodError = !paymentMethod ? t("common:validation.paymentMethodRequired") : undefined;

  const showCustomerError = !!customerError && (touched.customerId || submitted);
  const showPaymentMethodError = !!paymentMethodError && (touched.paymentMethod || submitted);

  const canSubmit = !customerError && !paymentMethodError;

  const selectedCustomer = customers.find((c) => c.id === customerId);

  const handleUpsertOrder = async () => {
    setSubmitted(true);

    if (!canSubmit || !paymentMethod || !selectedCustomer) return;

    try {
      if (mode === "add") {
        const payload: OrderCreate = {
          name: selectedCustomer?.name ?? "",
          email: selectedCustomer?.email ?? "",
          avatar: selectedCustomer?.avatar,
          currency: "USD",
          totalAmount: 0,
          status,
          issueDate,
          paymentMethod
        };

        await orderApi.post(payload);

        setSnackbarMessage({
          content: t("orders:snackbar.addSuccess"),
          type: "success"
        });
      } else {
        if (!orderId) return;

        const payload: OrderUpdate = {
          name: selectedCustomer?.name ?? initialOrder?.name,
          email: selectedCustomer?.email ?? initialOrder?.email,
          avatar: selectedCustomer?.avatar ?? initialOrder?.avatar,
          issueDate,
          paymentMethod,
          status
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
    customerId,
    issueDate,
    paymentMethod,
    status,
    showCustomerError,
    showPaymentMethodError,
    customerError,
    paymentMethodError,
    canSubmit,
    handleUpsertOrder,
    setCustomerIdOverride,
    setIssueDate,
    setPaymentMethod,
    setStatus,
    setTouched
  };
}

export default useOrderUpsertDialog;
