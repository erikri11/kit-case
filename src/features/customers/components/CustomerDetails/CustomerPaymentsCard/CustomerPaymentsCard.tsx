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

  const { t } = useTranslation('customers');
  const paymentSummary = customer.paymentSummary;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <ShoppingCartIcon  />
          </Avatar>
        }
        title={t('Payments')}
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
                Total orders
              </Typography>
              <Typography variant="h5">{paymentSummary.totalOrders}</Typography>
            </Stack>
              
            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                Orders value
              </Typography>
              <Typography variant="h5">${paymentSummary.ordersValue.toFixed(2)}</Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Typography color="text.secondary">
                Refunds
              </Typography>
              <Typography variant="h5">${paymentSummary.refundsValue.toFixed(2)}</Typography>
            </Stack>
          </Stack>
        </Box>

        <CustomerDetailsGrid />
      </CardContent>
    </Card>
  );
}
