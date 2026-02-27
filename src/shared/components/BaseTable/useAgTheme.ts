import { useMemo } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { baseTableTheme } from '@shared/theme/agGrid/baseTable';

export function useAgTheme() {
  const { mode, systemMode } = useColorScheme();

  // Always resolve to a valid mode (never undefined)
  const effectiveMode: 'light' | 'dark' = useMemo(() => {
    if (mode === 'dark') return 'dark';
    if (mode === 'light') return 'light';
    return systemMode === 'dark' ? 'dark' : 'light';
  }, [mode, systemMode]);

  return useMemo(() => baseTableTheme(effectiveMode), [effectiveMode]);
}
