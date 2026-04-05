import type { Order } from "@features/orders/models/order.model";
import { getTotalQuantity } from "@features/orders/utils/getTotalQuantity";
import { Box, Stack, Typography } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";
import dayjs from "dayjs";

export function OrderRenderer(params: ICellRendererParams<Order>) {
  const issueDate = params.data?.issueDate ?? new Date();
  const currency = params.data?.currency ?? "USD";
  const totalAmount = params.data?.totalAmount ?? 0;
  const orderNumber = params.data?.orderNumber ?? "UNKNOWN";

  const date = dayjs(issueDate);

  const formattedAmount= new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency 
  }).format(totalAmount);

  const productCount = getTotalQuantity(params.data?.lineItems ?? []);
  const productLabel = `${productCount} product${productCount === 1 ? "" : "s"}`;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        height: "100%"
      }}
    >
      <Stack
        sx={{
          bgcolor: "customGrey.light",
          borderRadius: 1.5,
          flex: "0 0 auto",
          px: 1,
          py: 0.25,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          minWidth: 40
        }}
      >
        <Typography variant="caption" sx={{ lineHeight: 1 }}>
          {date.format("MMM").toUpperCase()}
        </Typography>

        <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: "bold" }}>
          {date.format("D")}
        </Typography>
      </Stack>

      <Stack>
        <Typography color="text.secondary" variant="body2">
          <Box component="span">
            {orderNumber}
          </Box>
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {productLabel} •{" "}
          <Box component="span">
            {formattedAmount}
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default OrderRenderer;
