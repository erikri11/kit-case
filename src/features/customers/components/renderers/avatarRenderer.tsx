import type { Customer } from "@features/customers/models/customer";
import { Avatar, Box } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

export const avatarRenderer = (params: ICellRendererParams<Customer, string>) => {
  const pv = params.value;
  if (!pv) return null;

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Avatar
        alt={params.data?.name ?? 'avatar'}
        src={pv}
        sx={{ width: 36, height: 36 }}
      />
    </Box>
);
};
