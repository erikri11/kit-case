import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

export function LinearProgressRenderer (params: ICellRendererParams<number, undefined>) {
  const value = params.value;
  if (value == null) return null;

  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "80%",
          alignItems: "center"
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
