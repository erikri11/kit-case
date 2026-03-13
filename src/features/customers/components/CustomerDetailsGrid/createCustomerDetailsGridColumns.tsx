import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { CustomerPayment } from '@features/customers/models/customer.payment.model';
import { dateRenderer } from '../../../../shared/renderers/dateRenderer';

interface ColumnArgsProps {
  t: TFunction;
}

export function createCustomerDetailsGridColumns({ t }: ColumnArgsProps): ColDef<CustomerPayment>[] {
  
  return [
    {
      field: "amount",
      headerName: t("common:amount"),
      minWidth: 140,
      flex: 1,
      type: "rightAligned",
    },
    {
      field: "currency",
      headerName: t("common:currency"),
      minWidth: 120,
      flex: 1,
      type: "rightAligned",
    },
    {
      field: "invoiceId",
      headerName: t("common:invoiceId"),
      minWidth: 160,
      flex: 1,
    },
    {
      field: "status",
      headerName: t("common:status"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: t("common:createdAt"),
      minWidth: 180,
      flex: 1,
      type: "rightAligned",
      cellRenderer: dateRenderer
    }
  ];
}
