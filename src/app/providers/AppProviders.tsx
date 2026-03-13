import { useMemo, useState, type ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS, nb } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { SnackbarHost } from '@shared/components/SnackbarHost';
import { SnackbarContext } from '../../shared/context/snackbar/SnackbarContext';
import type { SnackbarMessage } from '@shared/types/snackbar';
import { UserRightsProvider } from '@shared/context/userRights/UserRightsProvider';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders(props: AppProvidersProps) {
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage | undefined>(undefined);
  const { i18n } = useTranslation();

  const lang = i18n.language.split("-")[0];
  const locale = lang === "nb" ? nb : enUS;

  const snackbarHandlingValue = useMemo(() => 
    ({ snackbarMessage, setSnackbarMessage }),
    [snackbarMessage]
  );

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={locale}
      key={locale.code}
    >
      <UserRightsProvider>
        <SnackbarContext.Provider value={snackbarHandlingValue}>
          <CssBaseline />
          <SnackbarHost />
          {props.children}
        </SnackbarContext.Provider>
      </UserRightsProvider>
    </LocalizationProvider>
  );
}
