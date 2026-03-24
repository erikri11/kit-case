import { orderApi } from "@features/orders/api/orderApi";
import type {Order, OrderCreate, OrderFieldName, OrderPaymentMethod, OrderStatus, OrderUpdate} from "@features/orders/models/order.model";
import { generateLast4 } from "@features/orders/utils/generateLast4";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useCustomers } from "@shared/hooks/useCustomers";
import type { Mode } from "@shared/types/mode";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface OrderUpsertDialogProps {
  open: boolean;
  mode: Mode;
  initialOrder?: Order;
  orderId?: string;
  onClose: () => void;
}

export function OrderUpsertDialog({
  open,
  mode,
  initialOrder,
  orderId,
  onClose
}: OrderUpsertDialogProps) {
  
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

  const customerError = !customerId ? "validation:required.customerRequired" : undefined;
  const paymentMethodError = !paymentMethod ? "validation:required.paymentMethodRequired" : undefined;

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "add" ? t("orders:actions.add") : t("orders:actions.edit")}
      </DialogTitle>

      <DialogContent className="pt-3">
        <Typography variant="h4" sx={{ mb: 3 }}>
          {t("common:labels.basicInformation")}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl variant="filled" fullWidth error={showCustomerError}>
              <InputLabel>{t("common:labels.customer")}</InputLabel>
              <Select
                value={customerId}
                label={t("common:labels.customer")}
                displayEmpty
                renderValue={(value) => {
                  const selected = customers.find((c) => c.id === value);
                  return selected?.name ?? "";
                }}
                onChange={(e) => {
                  setCustomerIdOverride(e.target.value);
                  setTouched((prev) => ({
                    ...prev,
                    customerId: true
                  }));
                }}
                onClose={() =>
                  setTouched((prev) => ({
                    ...prev,
                    customerId: true
                  }))
                }
              >
                {customers.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {showCustomerError && customerError ? t(customerError) : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={6}>
            {mode === "edit" && (
              <TextField
                label={t("common:labels.orderNumber")}
                variant="filled"
                fullWidth
                value={initialOrder?.orderNumber ?? ""}
                disabled
              />
            )}
          </Grid>

          <Grid size={6}>
            <DatePicker
              format="dd.MM.yyyy"
              label={t("common:labels.issueDate")}
              value={issueDate}
              onChange={(newDateValue: Date | null) => {
                setIssueDate(newDateValue ?? new Date());
              }}
              slotProps={{
                textField: {
                  variant: "filled"
                }
              }}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={6}>
            <FormControl variant="filled" fullWidth error={showPaymentMethodError}>
              <InputLabel>{t("common:labels.paymentMethod")}</InputLabel>
              <Select
                value={paymentMethod?.type ?? ""}
                label={t("common:labels.paymentMethod")}
                renderValue={(value) => t(`orders:paymentMethod.${value}`)}
                onChange={(e) => {
                  const type = e.target.value as OrderPaymentMethod["type"];

                  setPaymentMethod((prev) => ({
                    type,
                    last4:
                      type === "ApplePay" || type === "GooglePay"
                        ? undefined
                        : prev?.type === type && prev?.last4
                          ? prev.last4
                          : generateLast4()
                  }));

                  setTouched((prev) => ({
                    ...prev,
                    paymentMethod: true
                  }));
                }}
                onClose={() =>
                  setTouched((prev) => ({
                    ...prev,
                    paymentMethod: true
                  }))
                }
              >
                <MenuItem value="Amex">{t("orders:paymentMethod.Amex")}</MenuItem>
                <MenuItem value="ApplePay">{t("orders:paymentMethod.ApplePay")}</MenuItem>
                <MenuItem value="GooglePay">{t("orders:paymentMethod.GooglePay")}</MenuItem>
                <MenuItem value="MasterCard">{t("orders:paymentMethod.MasterCard")}</MenuItem>
                <MenuItem value="Visa">{t("orders:paymentMethod.Visa")}</MenuItem>
              </Select>
              <FormHelperText>
                {showPaymentMethodError && paymentMethodError ? t(paymentMethodError) : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel>{t("common:labels.status")}</InputLabel>
              <Select
                value={status}
                label={t("common:labels.status")}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                renderValue={(value) => t(`orders:status.${value}`)}
              >
                <MenuItem value="Pending">{t("orders:status.Pending")}</MenuItem>
                <MenuItem value="Completed">{t("orders:status.Completed")}</MenuItem>
                <MenuItem value="Canceled">{t("orders:status.Canceled")}</MenuItem>
                <MenuItem value="Rejected">{t("orders:status.Rejected")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common:actions.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleUpsertOrder}
          disabled={!canSubmit}
        >
          {mode === "add" ? t("common:actions.add") : t("common:actions.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderUpsertDialog;
