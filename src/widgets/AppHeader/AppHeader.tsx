import { useTranslation } from 'react-i18next';
import { AppBar, FormControl, IconButton, InputLabel, MenuItem, Select, Toolbar, Typography, type SelectChangeEvent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarLogo } from './AppBarLogo';
import { useUserRights } from '../../shared/context/userRights/useUserRights';
import LanguageToggle from '@shared/components/LanguageToggle/LanguageToggle';
import { RoleEnum } from '@shared/types/roleEnum';
import CurrencyToggle from '@shared/components/CurrencyToggle/CurrencyToggle';
import { ColorSchemeToggle } from '@shared/components/ColorSchemeToggle/ColorSchemeToggle';
import { UserMenu } from '@shared/components/UserMenu/UserMenu';

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader(props: AppHeaderProps) {
  const { t } = useTranslation("common"); 
  const { role, setRole } = useUserRights();

  const handleRoleChange = (e: SelectChangeEvent) => {
    setRole(e.target.value as RoleEnum);
  };

  const labelSx = {
    color: "#fff",
    "&.Mui-focused": { color: "#fff" },
    "&.MuiFormLabel-filled": { color: "#fff" },
    "&.MuiInputLabel-shrink": { color: "#fff" },
  };

  const selectSx = {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.18)",
    },
    color: "#fff",
    "& .MuiSvgIcon-root": {
      color: "inherit",
    }
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

        <FormControl 
          variant="filled" 
          size="small" 
          sx={{ mr: 2, minWidth: 140, display: { xs: "none", sm: "flex" } }}
        >
          <InputLabel 
            id="role-select-label"
            sx={labelSx}
          >
            {t("common:labels.role")}
          </InputLabel>
          <Select
            labelId="role-select-label"
            aria-label="Select role"
            value={role}
            onChange={handleRoleChange}
            sx={selectSx}
          >
            <MenuItem value={RoleEnum.USER}>{t("common:labels.user")}</MenuItem>
            <MenuItem value={RoleEnum.ADMIN}>{t("common:labels.administrator")}</MenuItem>
          </Select>
        </FormControl>
        
        <LanguageToggle />
        <CurrencyToggle />
        <ColorSchemeToggle />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
