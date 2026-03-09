import { useContext } from 'react';
import { SnackbarContext } from './SnackbarContext';

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    // TODO:: Replace with proper error handling/logging
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return ctx;
}
