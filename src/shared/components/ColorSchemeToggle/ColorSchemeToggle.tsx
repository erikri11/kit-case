import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export function ColorSchemeToggle() {
  const { t } = useTranslation("common");
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) return null;

  const effectiveMode = mode === "system" ? systemMode : mode;

  const handleToggle = () => {
    if (mode === "system") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("light");
    } else {
      setMode("system");
    }
  };

  const nextMode =
    mode === "system"
      ? "dark"
      : mode === "dark"
        ? "light"
        : "system";

  return (
    <Tooltip
      arrow
      title={t("common:labels.changeThemeTo", {
        theme: t(`common:labels.themes.${nextMode}`)
      })}
    >
      <IconButton
        aria-label={t("common:labels.toggleColorScheme")}
        color="inherit"
        onClick={handleToggle}
      >
        {mode === "system"
          ? <BrightnessAuto />
          : effectiveMode === "dark"
            ? <Brightness7 />
            : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
