import type { ICellRendererParams } from "ag-grid-enterprise";
import { Avatar, Stack, Typography } from "@mui/material";
import type { OrderDetails } from "@features/orders/models/model/order.details.model";
import { resolveAvatarSrc } from "@features/customers/utils/resolveAvatarSrc";

export function OrderCustomerRenderer(props: ICellRendererParams<OrderDetails>) {
  const customer = props.data?.customer;

  if (!customer) return null;

  return (
    <Stack 
      direction="row" 
      spacing={1.5} 
      alignItems="center" 
      sx={{ height: "100%" }}
    >
      <Avatar
        src={customer.avatar ? resolveAvatarSrc(customer.avatar) : undefined}
        alt={customer.name}
        sx={{ width: 40, height: 40 }}
      >
        {customer.name.charAt(0)}
      </Avatar>

      <Stack spacing={0}>
        <Typography variant="body2">
          {customer.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {customer.email}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default OrderCustomerRenderer;
