import { Box, CircularProgress } from "@mui/material";

export function CenteredSpinner() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <CircularProgress size={40} />
    </Box>
  );
}
