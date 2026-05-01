import type { Order } from "@features/orders/models/model/order.model";
import { getTotalQuantity } from "@features/orders/utils/getTotalQuantity";
import { Box, Stack, Typography } from "@mui/material";
import useCurrency from "@shared/context/currency/useCurrency";
import { formatPrice } from "@shared/utils/formatPrice";
import type { ICellRendererParams } from "ag-grid-enterprise";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export function OrderRenderer(params: ICellRendererParams<Order>) {
  const { t, i18n } = useTranslation();
  const { currency: displayCurrency } = useCurrency();

  const issueDate = params.data?.issueDate ?? new Date();
  const originalCurrency = params.data?.currency ?? "USD";
  const totalAmount = params.data?.totalAmount ?? 0;
  const orderNumber = params.data?.orderNumber ?? t("common:labels.unknown");

  const date = dayjs(issueDate);
  const language = i18n.language;

  const formattedAmount = formatPrice(
    totalAmount,
    originalCurrency,
    displayCurrency,
    language
  );

  const productCount = getTotalQuantity(params.data?.lineItems ?? []);
  const productLabel =
    productCount === 1
      ? `1 ${t("common:labels.product")}`
      : `${productCount} ${t("common:labels.products")}`;

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
          width: 40
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
        <Typography variant="body2">
          <Box component="span">{orderNumber}</Box>
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {productLabel} • <Box component="span">{formattedAmount}</Box>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default OrderRenderer;
