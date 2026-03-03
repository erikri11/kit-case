import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import type { ValueFormatterParams } from "ag-grid-enterprise";

export const linearProgressRenderer = (params: ValueFormatterParams) => {
  const pv = params.value as number | undefined;
  if (pv == null) return null;

  const safeValue = Math.max(0, Math.min(100, pv));

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: '80%',
          alignItems: 'center'
        }}
      >
        <LinearProgress
          variant="determinate"
          value={safeValue}
          sx={{ flex: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {safeValue}%
        </Typography>
      </Stack>
    </Box>
  );
};
