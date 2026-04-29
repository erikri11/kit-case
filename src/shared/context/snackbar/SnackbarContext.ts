import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { SnackbarMessage } from '@shared/models/model/snackbar.model';

export interface SnackbarContextProps {
  snackbarMessage: SnackbarMessage | undefined;
  setSnackbarMessage: Dispatch<SetStateAction<SnackbarMessage | undefined>>;
}

export const SnackbarContext = createContext<SnackbarContextProps | null>(null);
