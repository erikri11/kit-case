import { Chip } from "@mui/material";
import type { ICellRendererParams } from "ag-grid-enterprise";
import type { Customer, CustomerStatus } from "@features/customers/models/customer.model";
import { STATUS_CONFIG } from "@features/customers/models/statusConfig";
import { useTranslation } from "react-i18next";

export function StatusChipRenderer (params: ICellRendererParams<Customer, CustomerStatus>) {
  const { t } = useTranslation("customers");

  const status = params.value;
  if (!status) return null;

  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Chip
      icon={<Icon />}
      label={t(config.labelKey)}
      color={config.color}
      variant="outlined"
      size="small"
    />
  );
}
