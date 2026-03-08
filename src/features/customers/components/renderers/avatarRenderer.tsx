import type { Customer } from "@features/customers/models/customer.model";
import { Avatar, Box } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

export const avatarRenderer = (params: ICellRendererParams<Customer, string>) => {
  const customer = params.value;
  if (!customer) return null;

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
        src={customer}
        sx={{ width: 36, height: 36 }}
        {...stringAvatar(params.data?.name ?? 'NN')}
      />
    </Box>
  );
};

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

