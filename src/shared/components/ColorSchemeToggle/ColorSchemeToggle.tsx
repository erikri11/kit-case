import { IconButton } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material';

export function ColorSchemeToggle() {
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

  return (
    <IconButton
      aria-label="Toggle color scheme"
      color="inherit"
      onClick={handleToggle}
    >
      {mode === "system"
        ? <BrightnessAuto />
        : effectiveMode === "dark"
          ? <Brightness7 />
          : <Brightness4 />}
    </IconButton>
  );
}
