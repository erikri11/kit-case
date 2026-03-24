import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslation } from 'react-i18next';

export function UnauthorizedPage() {
  const { t } = useTranslation(["common", "error"]); 
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            mb: 2,
            border: (theme) => `2px solid ${theme.palette.error.main}`,
          }}
        >
          <LockOutlinedIcon color="error" sx={{ fontSize: 36 }} />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom>
          {t("error:accessDenied")}
        </Typography>

        <Typography variant="body1" sx={{mb: 1}}>
          {t("error:youDoNotHavePermissionToViewThisPage")}
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          {t("error:pleaseContactAnAdministratorIfYouBelieveThisIsAnError")}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/overview")}
          sx={{ mr: 1 }}
        >
          {t("common:actions.goToOverview")}
        </Button>

        <Button variant="text" onClick={() => navigate(-1) || navigate("/overview")}>
          {t("common:actions.goBack")}
        </Button>
      </Box>
    </Box>
  );
}

export default UnauthorizedPage;