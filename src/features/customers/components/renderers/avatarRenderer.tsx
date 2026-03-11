import type { Customer } from "@features/customers/models/customer.model";
import { Avatar, Box } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";

export function AvatarRenderer (params: ICellRendererParams<Customer, string>) {
  const avatar = params.value;
  const name = params.data?.name ?? 'NN';

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Avatar
        alt={name}
        src={avatar ?? undefined}
        sx={{ width: 36, height: 36 }}
      >
        {!avatar ? getInitials(name) : null}
      </Avatar>
    </Box>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  
  return (first + second).toUpperCase() || "NN";
}
