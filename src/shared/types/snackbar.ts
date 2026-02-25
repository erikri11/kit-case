import type { AlertColor } from 'node_modules/@mui/material/esm/Alert/Alert';
import type { ReactNode } from 'react';

export interface SnackbarMessage {
  content: ReactNode,
  type: AlertColor,
  duration?: number,
  userId?: string
}
