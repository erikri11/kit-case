import {Avatar, Box, Card, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from "react-i18next";
import { CustomerDetailsGrid } from "../../CustomerDetailsGrid/CustomerDetailsGrid";
import type { CustomerDetails } from "@features/customers/models/customer.details.model";
import useCurrency from "@shared/context/currency/useCurrency";
import { formatPrice } from "@shared/utils/formatPrice";

interface CustomerPaymentsCardProps {
  customer: CustomerDetails;
}

export function CustomerPaymentsCard({
  customer
}: CustomerPaymentsCardProps) {
  const { t, i18n } = useTranslation("common");
  const { currency: displayCurrency } = useCurrency();

  const paymentSummary = customer.paymentSummary;
  const language = i18n.language;



  

  const totalOrders = customer.orders.length;

  const statusCounts = customer.orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusText = Object.entries(statusCounts)
    .filter(([status]) => status !== "Completed") // optional
    .map(([status, count]) => `${count} ${t(`orders:status.${status}`)}`)
    .join(", ");

  const ordersLabel = statusText
    ? `${totalOrders} (${statusText})`
    : `${totalOrders}`;





  const ordersNetBase =
    paymentSummary.ordersValueBase - paymentSummary.refundsValueBase;

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

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <ShoppingCartIcon />
          </Avatar>
        }
        title={t("common:labels.payments")}
      />
      <CardContent>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 2
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", md: "block" } }}
                />
                <Divider
                  orientation="horizontal"
                  flexItem
                  sx={{ display: { xs: "block", md: "none" } }}
                />
              </>
            }
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t("common:labels.totalOrders")}
              </Typography>
              <Typography variant="h5">
                {ordersLabel}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t("common:labels.ordersValue")}
              </Typography>
              <Typography variant="h5">
                {formattedOrdersNet}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t("common:labels.refunds")}
              </Typography>
              <Typography
                variant="h5"
                sx={{ textAlign: { xs: "left", md: "right" } }}
              >
                {formattedRefunds}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <CustomerDetailsGrid payments={customer.payments} />
      </CardContent>
    </Card>
  );
}

export default CustomerPaymentsCard;
