import { useSnackbar } from '@shared/context/snackbar/useSnackbar';
import { Alert, Snackbar, type AlertColor } from '@mui/material';

export function SnackbarHost() {
  const { snackbarMessage, setSnackbarMessage } = useSnackbar();

  return (
    <Snackbar
      open={!!snackbarMessage}
      autoHideDuration={snackbarMessage?.duration ?? 3000}
      onClose={() => setSnackbarMessage(undefined)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert 
        variant="filled"
        onClose={() => setSnackbarMessage(undefined)} 
        severity={(snackbarMessage?.type as AlertColor) ?? 'info'} 
        sx={{ minWidth: '250px' }}
       >
        {snackbarMessage?.content}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarHost;
