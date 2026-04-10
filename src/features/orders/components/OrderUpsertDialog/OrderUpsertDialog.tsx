import type {Order, OrderPaymentMethod} from "@features/orders/models/order.model";
import { generateLast4 } from "@features/orders/utils/generateLast4";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Mode } from "@shared/types/mode";
import { useOrderUpsertDialog } from "./useOrderUpsertDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from '@mui/material/InputAdornment';
import { ORDER_PAYMENT_METHODS, ORDER_STATUSES, type OrderStatus } from "@features/orders/models/order.constants";
import { resolveSelectedValue } from "@features/orders/utils/resolveSelectedValue";

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

  const {
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
    lineItems,
    products,
    totalAmount,
    isMockOrder,
    isOrderLocked,
    allProductsSelected,
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
  } = useOrderUpsertDialog({
    mode,
    initialOrder,
    orderId,
    onClose
  }); 

  const selectedCustomerId = resolveSelectedValue(customers, customerId);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
    >
      <DialogTitle>
        {mode === "add" ? t("orders:actions.add") : t("orders:actions.edit")}
      </DialogTitle>

      <DialogContent className="pt-3">
        <Typography 
          variant="h4" 
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
        >
          {t("common:labels.basicInformation")}
          {isOrderLocked && (
            <Tooltip arrow title={"Completed or refunded orders cannot be edited or deleted"}>
              <InfoOutlinedIcon color="info" />
            </Tooltip>
          )}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ md: 5, sm: 6, xs: 12 }}>
            <FormControl variant="filled" fullWidth error={showCustomerError}>
              <InputLabel>{t("common:labels.customer")}</InputLabel>
              <Select
                value={selectedCustomerId}
                label={t("common:labels.customer")}
                displayEmpty
                renderValue={(value) => {
                  const selected = customers.find((c) => c.id === value);
                  return selected?.name ?? "";
                }}
                onChange={(e) => {
                  setCustomerIdOverride(e.target.value as string);
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
                disabled={isOrderLocked}
              >
                {customers.map((c) => (
                  <MenuItem 
                    key={c.id} 
                    value={c.id} 
                    disabled={c.status === "Blocked"}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {showCustomerError && customerError ? customerError : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ md: 5, sm: 6, xs: 12 }}>
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

          <Grid size={{ md: 5, sm: 6, xs: 12 }}>
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
              disabled={isOrderLocked}
            />
          </Grid>

          <Grid size={{ md: 5, sm: 6, xs: 12 }}>
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
                disabled={isOrderLocked}
              >
                {ORDER_PAYMENT_METHODS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {t(`orders:paymentMethod.${p}`)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {showPaymentMethodError && paymentMethodError ? paymentMethodError : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ md: 5, sm: 6, xs: 12 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel>{t("common:labels.status")}</InputLabel>
              <Select
                value={status}
                label={t("common:labels.status")}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                renderValue={(value) => t(`orders:status.${value}`)}
                disabled={mode === "add"}
              >
                {ORDER_STATUSES.map((s) => {
                  const baseStatus = initialOrder?.status ?? status;

                  return (
                    <MenuItem 
                      key={s} 
                      value={s}
                      disabled={
                        (baseStatus === "Completed" && s !== "Completed" && s !== "Refunded") ||
                        (baseStatus === "Pending" && s !== "Pending" && s !== "Completed") ||
                        (baseStatus === "Refunded" && s !== "Refunded")
                      }
                    >
                      {t(`orders:status.${s}`)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ md: 12, sm: 12, xs: 12 }}>
            <Box sx={{ mt: 2 }}>
              <Typography 
                variant="h4" 
                sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
              >
                {t("common:labels.lineItems")}
                {isOrderLocked && (
                  <Tooltip arrow title={"Completed or refunded orders cannot be edited or deleted"}>
                    <InfoOutlinedIcon color="info" />
                  </Tooltip>
                )}
              </Typography>
              
              {lineItems.map((item) => {
                const selectedProductIdsOnOtherLines = lineItems
                  .filter((li) => li.id !== item.id)
                  .map((li) => li.productId)
                  .filter(Boolean);

                return (
                  <Grid container spacing={2} key={item.id} sx={{ mb: 2 }}>
                    <Grid size={{ md: 5, sm: 6, xs: 12 }}>
                      <FormControl variant="filled" fullWidth>
                        <InputLabel>{t("common:labels.product")}</InputLabel>
                      <Select
                        value={resolveSelectedValue(products, item.productId)}
                        label={t("common:labels.product")}
                        renderValue={(value) => {
                          const selected = products.find((p) => p.id === value);
                          return selected?.name ?? "";
                        }}
                        onChange={(e) =>
                          updateLineItemProduct(item.id, e.target.value as string)
                        }
                        disabled={isMockOrder || isOrderLocked}
                      >
                        {products
                          .filter((p) => p.status !== "Archived" && p.status !== "Draft")
                          .map((p) => {
                            const isSelectedOnAnotherLine = selectedProductIdsOnOtherLines.includes(p.id);
                            return (
                              <MenuItem 
                                key={p.id} 
                                value={p.id} 
                                disabled={isSelectedOnAnotherLine}
                              >
                                {p.name}
                              </MenuItem>
                            );
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ md: 2, sm: 6, xs: 12 }}>
                    <TextField
                      label={t("common:labels.quantity")}
                      variant="filled"
                      fullWidth
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItemQuantity(item.id, Number(e.target.value))
                      }
                      slotProps={{
                        htmlInput: { min: 1 }
                      }}
                      disabled={isMockOrder || isOrderLocked}
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 6, xs: 12 }}>
                    <TextField
                      label={t("common:labels.unit")}
                      variant="filled"
                      fullWidth
                      value={item.unitAmount.toFixed(2)}
                      disabled
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }
                      }}
                    />
                  </Grid>

                  <Grid size={{ md: 2, sm: 6, xs: 12 }}>
                    <TextField
                      label={t("common:labels.total")}
                      variant="filled"
                      fullWidth
                      value={item.totalAmount.toFixed(2)}
                      disabled
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }
                      }}
                    />
                  </Grid>

                  <Grid size={{ md: 1, sm: 6, xs: 12 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "center" },
                        alignItems: "center",
                        height: "100%"
                      }}
                    >
                      <IconButton
                        aria-label="remove line item"
                        color="error"
                        onClick={() => removeLineItem(item.id)}
                        disabled={isMockOrder || isOrderLocked || lineItems.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              )})}

              <Button
                color="inherit"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addLineItem}
                disabled={isMockOrder || isOrderLocked || allProductsSelected}
              >
                {t("products:actions.add")}
              </Button>
                
            </Box>
          </Grid>

          <Grid size={12}>
            <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
              {t("common:labels.total")}: ${totalAmount.toFixed(2)}
            </Typography>
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
