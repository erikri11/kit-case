import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { customerApi } from "@features/customers/api/customersApi";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";

interface CustomerSecurityCardProps {
  customerId: string;
}

export function CustomerSecurityCard({ customerId }: CustomerSecurityCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(["customers", "common"]);
  const { setSnackbarMessage } = useSnackbar();

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <PrivacyTipIcon  />
          </Avatar>
        }
        title={t("common:security")}
      />
      <CardContent>
        <Stack spacing={1}>
          <Button 
            color="error" 
            variant="contained" 
            sx={{ alignSelf: "flex-start" }}
            onClick={async () => {
              try {
                await customerApi.delete(customerId);
                setSnackbarMessage({ 
                  content: t("customers:snackbar.deleteSuccess"), 
                  type: "success" 
                });
                navigate("/admin/customers/list");
              } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error(`Failed to delete customer: ${errorMessage}`);

                setSnackbarMessage({ 
                  content: t("customers:snackbar.deleteError"), 
                  type: "error" 
                });
              }
            }}
          >
            {t("common:deleteAccount")}
          </Button>
          <Typography color="text.secondary" variant="body2">
            {t("common:deleteAccountWarning")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
