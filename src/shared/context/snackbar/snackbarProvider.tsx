import { useMemo, useState, type ReactNode } from 'react';
import { SnackbarContext } from './SnackbarContext';
import type { SnackbarMessage } from '@shared/models/model/snackbar.model';

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage | undefined>(undefined);

  const value = useMemo(
    () => ({ snackbarMessage, setSnackbarMessage }),
    [snackbarMessage]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
