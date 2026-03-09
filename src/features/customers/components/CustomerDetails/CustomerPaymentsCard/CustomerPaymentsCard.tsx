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

  const { t } = useTranslation(['customers', 'common']);
  const paymentSummary = customer.paymentSummary;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <ShoppingCartIcon  />
          </Avatar>
        }
        title={t('common:payments')}
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
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ justifyContent: "space-between"}}
          >
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t('customers:totalOrders')}
              </Typography>
              <Typography variant="h5">{paymentSummary.totalOrders}</Typography>
            </Stack>
              
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t('customers:ordersValue')}
              </Typography>
              <Typography variant="h5">${paymentSummary.ordersValue.toFixed(2)}</Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                {t('customers:refundsValue')}
              </Typography>
              <Typography variant="h5">${paymentSummary.refundsValue.toFixed(2)}</Typography>
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
