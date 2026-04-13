import { useTranslation } from 'react-i18next';
import { AppBar, IconButton, MenuItem, Toolbar, Typography, type SelectChangeEvent } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material';
import { AppBarLogo } from './AppBarLogo';
import { useUserRights } from '../../shared/context/userRights/useUserRights';
import LanguageToggle from '@shared/components/LanguageToggle';
import Select from '@shared/mui/Select/Select';
import { RoleEnum } from '@shared/types/roleEnum';
import CurrencyToggle from '@shared/components/CurrencyToggle/CurrencyToggle';

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader(props: AppHeaderProps) {
  const { t } = useTranslation("common"); 
  const { role, setRole } = useUserRights();
  const { mode, systemMode, setMode } = useColorScheme();
  if (!mode) return null;

  const effectiveMode =
    mode === "system" ? systemMode : mode;

  const handleToggle = () => {
    if (mode === "system") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("light");
    } else {
      setMode("system");
    }
  };

  const renderIcon = () => {
    if (mode === "system") return <BrightnessAuto />;
    return effectiveMode === "dark"
      ? <Brightness7 />
      : <Brightness4 />;
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setRole(e.target.value as unknown as RoleEnum);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <AppBarLogo />
        <IconButton
          aria-label="open drawer"
          color="inherit"
          edge="start"
          onClick={props.onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h1" 
          component="div" 
          sx={{ flexGrow: 1 }}
        >
          Demo Soft
        </Typography>

        <Select
          aria-label="Select role"
          variant="filled"
          size="small"
          value={role}
          onChange={handleRoleChange}
          sx={{ 
            mr: 2, 
            minWidth: 140, 
            display: { xs: "none", sm: "flex" },
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            color: "inherit",
            "& .MuiSvgIcon-root": {
              color: "inherit",
            }
          }}
        >
          <MenuItem value={RoleEnum.USER}>{t("common:labels.user")}</MenuItem>
          <MenuItem value={RoleEnum.ADMIN}>{t("common:labels.administrator")}</MenuItem>
        </Select>
        
        <LanguageToggle />
        <CurrencyToggle />

        <IconButton
          aria-label="Toggle color scheme"
          color="inherit"
          onClick={handleToggle}
          sx={{ ml: 1 }}
        >
          {renderIcon()}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
