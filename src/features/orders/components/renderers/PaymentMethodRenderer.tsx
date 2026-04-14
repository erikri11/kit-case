import type { Order, OrderPaymentMethod } from "@features/orders/models/order.model";
import { Avatar, Stack, Typography } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

function getPaymentMethodThumbnail(type?: OrderPaymentMethod["type"]): string {
  switch (type) {
    case "Visa":
      return "/payment-methods/visa.png";
    case "MasterCard":
      return "/payment-methods/mastercard.png";
    case "Amex":
      return "/payment-methods/amex.png";
    case "ApplePay":
      return "/payment-methods/applepay.png";
    case "GooglePay":
      return "/payment-methods/googlepay.png";
    default:
      return "";
  }
}

export function PaymentMethodRenderer(params: ICellRendererParams<Order, string>) {
  const paymentMethod = params.data?.paymentMethod;
  const thumbnail = getPaymentMethodThumbnail(paymentMethod?.type);

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center", height: "100%" }}>
      <Avatar
        sx={{
          bgcolor: "background.paper",
          boxShadow: 2
        }}
        src={thumbnail}
      />

      <Stack>
        <Typography variant="body2">
          {paymentMethod?.type ?? "Unknown"}
        </Typography>

        {paymentMethod?.last4 && (
          <Typography color="text.secondary" variant="body2">
            •••• {paymentMethod.last4}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default PaymentMethodRenderer;
