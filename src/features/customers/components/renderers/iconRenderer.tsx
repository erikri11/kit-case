import { Box, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { ICellRendererParams } from "ag-grid-community";
import type { Customer } from "@features/customers/models/customer.model";

export function iconRenderer(params: 
  ICellRendererParams<Customer> & { 
  onOpenDetails: (customer: Customer) => void 
  }) {
    const customer = params.data;
    if (!customer) return null;
  
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          params.onOpenDetails(customer);
        }}
      >
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
