import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { CustomerPayment } from '@features/customers/models/customer.payment.model';
import { dateRenderer } from '../../../../shared/renderers/dateRenderer';
import PaymentStatusChipRenderer from '../renderers/PaymentStatusChipRenderer';
import { paymentStatusRankCompare } from '../comparators/paymentStatusRankCompare';
import { formatCurrency } from '@shared/utils/formatCurrency';

interface ColumnArgsProps {
  t: TFunction;
}

export function createCustomerDetailsGridColumns({ 
  t 
}: ColumnArgsProps): ColDef<CustomerPayment>[] {
  
  return [
    {
      field: "amount",
      headerName: t("common:labels.amount"),
      minWidth: 140,
      flex: 1,
      type: "rightAligned",
      valueFormatter: (params) =>
        formatCurrency(params.value, params.data?.currency ?? "USD")
    },
    {
      field: "invoiceId",
      headerName: t("common:labels.invoiceId"),
      minWidth: 160,
      flex: 1
    },
    {
      field: "status",
      headerName: t("common:labels.status"),
      minWidth: 140,
      flex: 1,
      cellRenderer: PaymentStatusChipRenderer,
      comparator: paymentStatusRankCompare
    },
    {
      field: "createdAt",
      headerName: t("common:labels.createdAt"),
      minWidth: 180,
      flex: 1,
      type: "rightAligned",
      cellRenderer: dateRenderer
    }
  ];
}
