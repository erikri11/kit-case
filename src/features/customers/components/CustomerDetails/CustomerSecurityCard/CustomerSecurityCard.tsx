import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CustomersApi } from "@features/customers/api/customersApi";

interface CustomerSecurityCardProps {
  customerId: string;
}

export function CustomerSecurityCard({ 
  customerId 
}: CustomerSecurityCardProps) {

  const { t } = useTranslation('customers');
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <PrivacyTipIcon  />
          </Avatar>
        }
        title={t('Security')}
      />
      <CardContent>
        <Stack spacing={1}>
          <Button 
            color="error" 
            variant="contained" 
            sx={{ alignSelf: 'flex-start' }}
            onClick={async () => {
              try {
                await CustomersApi.delete(customerId);
                navigate("/admin/customers/list");
              } catch (error) {
                console.error("Failed to delete customer", error);
              }
            }}
          >
            {t('Delete account')}
          </Button>
          <Typography color="text.secondary" variant="body2">
            {t('A deleted customer cannot be restored. All data will be permanently removed.')}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
