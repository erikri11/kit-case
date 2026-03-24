import { Avatar, Card, CardContent, CardHeader, Chip, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import UserIcon from '@mui/icons-material/Person';
import { useTranslation } from "react-i18next";
import type { Customer } from "@features/customers/models/customer.model";

interface CustomerBasicDetailsCardProps {
  customer: Customer;
}

export function CustomerBasicDetailsCard({ 
  customer 
}: CustomerBasicDetailsCardProps) {
  
  const { t } = useTranslation("common");

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <UserIcon />
          </Avatar>
        }
        title={t("common:labels.basicDetails")}
      />
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.customerId")}
            </Typography>
            <Chip label={customer.id} sx={{ alignSelf: "flex-start" }} />
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.name")} 
            </Typography>
            <Typography variant="body1">
              {customer.name}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.email")} 
            </Typography>
            <Typography variant="body1">
              {customer.email}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.phone")} 
            </Typography>
            <Typography variant="body1">
              {customer.phone}
            </Typography>
          </Stack>

          <Divider />
          
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.quota")} 
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <LinearProgress
                variant="determinate"
                value={customer.quota ?? 0}
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {customer.quota ?? 0}%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
