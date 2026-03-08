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
          {t('Customer not found')}
        </Typography>

        <Typography color="text.secondary">
          {t('The customer you are looking for does not exist or may have been removed.')}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/customers/list")}
        >
          Back to customers
        </Button>
      </Stack>
    </Box>
  );
}
