import { Avatar, Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from "react-i18next";
import { CustomerDetailsGrid } from "../../CustomerDetailsGrid/CustomerDetailsGrid";
import type { CustomerDetails } from "@features/customers/models/customer.details.model";

interface CustomerPaymentsCardProps {
  customer: CustomerDetails;
}

export function CustomerPaymentsCard({ 
  customer 
}: CustomerPaymentsCardProps) {
  
  const { t } = useTranslation("common");
  const paymentSummary = customer.paymentSummary;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <ShoppingCartIcon  />
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
            sx={{ justifyContent: "space-between"}}
          >
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t("common:labels.totalOrders")}
              </Typography>
              <Typography variant="h5">
                {paymentSummary.totalOrders}
              </Typography>
            </Stack>
              
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t("common:labels.ordersValue")}
              </Typography>
              <Typography variant="h5">
                ${paymentSummary.ordersValue.toFixed(2)}
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
                ${paymentSummary.refundsValue.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <CustomerDetailsGrid 
          payments={customer.payments} 
        />
      </CardContent>
    </Card>
  );
}
