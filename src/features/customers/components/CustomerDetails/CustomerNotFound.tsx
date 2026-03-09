import { Box, Button, Stack, Typography } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CustomerNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation('customers');

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <PersonOffIcon sx={{ fontSize: 80, color: "text.secondary" }} />

        <Typography variant="h4">
          {t('customers:customerNotFound')}
        </Typography>

        <Typography color="text.secondary">
          {t('customers:customerNotFoundMessage')}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/customers/list")}
        >
          {t('customers:backToCustomers')}
        </Button>
      </Stack>
    </Box>
  );
}
