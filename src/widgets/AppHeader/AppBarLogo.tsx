import { Box, IconButton } from '@mui/material';
import { useNavigateWithQuery } from './useNavigateWithQuery';
import logo from '@assets/logo-emblem.png';

export function AppBarLogo() {
  const navigateWithQuery = useNavigateWithQuery();

  return (
    <IconButton
      edge="start"
      onClick={() => navigateWithQuery('/dashboard')}
      aria-label="Go to dashboard"
      sx={{ mr: 1 }}
    >
      <Box
        component="img"
        src={logo}
        alt="KitCase logo"
        sx={{ width: 32, height: 32 }}
      />
    </IconButton>
  );
}
