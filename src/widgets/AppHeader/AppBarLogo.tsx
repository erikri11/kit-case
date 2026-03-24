import { Box, IconButton } from '@mui/material';
import { useNavigateWithQuery } from './useNavigateWithQuery';
import logo from '@assets/logo-emblem.png';
import { useTranslation } from 'react-i18next';

export function AppBarLogo() {
  const navigateWithQuery = useNavigateWithQuery();
  const { t } = useTranslation("common");

  return (
    <IconButton
      edge="start"
      onClick={() => navigateWithQuery("/overview")}
      aria-label={t("common:labels.goToOverview")}
      sx={{ mr: 1 }}
    >
      <Box
        component="img"
        src={logo}
        alt="Demo Soft logo"
        sx={{ width: 32, height: 32 }}
      />
    </IconButton>
  );
}

export default AppBarLogo;
