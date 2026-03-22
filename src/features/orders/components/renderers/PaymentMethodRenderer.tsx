import type { Order } from "@features/orders/models/order.model";
import { Avatar, Stack, Typography } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

export function PaymentMethodRenderer(params: ICellRendererParams<Order, string>) {
  const paymentMethod = params.data?.paymentMethod;
  const thumbnail = params.data?.thumbnail ?? "";

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        height: "100%"
      }}
    >
      <Avatar
        sx={{
          bgcolor: "background.paper",
          boxShadow: 4
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
