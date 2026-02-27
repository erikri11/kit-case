import { Chip } from "@mui/material";
import type { ValueFormatterParams } from "ag-grid-enterprise";
import type { CustomerStatus } from "@features/customers/models/customer";
import { STATUS_COLOR } from "@features/customers/models/statusColor";
import { STATUS_ICON } from "@features/customers/models/status";

export const chipRenderer = (params: ValueFormatterParams) => {
 const pv = params.value as CustomerStatus;
  if (!pv) return null;

  return (
    <Chip 
      icon={STATUS_ICON[pv]} 
      label={pv} 
      color={STATUS_COLOR[pv]}
      variant="outlined"
      size="small" 
    />
  );
};
