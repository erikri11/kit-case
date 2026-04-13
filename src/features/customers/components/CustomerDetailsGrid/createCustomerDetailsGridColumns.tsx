import type { TFunction } from 'i18next';
import type { ColDef } from 'ag-grid-enterprise';
import type { CustomerPayment } from '@features/customers/models/customer.payment.model';
import { dateRenderer } from '../../../../shared/renderers/dateRenderer';
import PaymentStatusChipRenderer from '../renderers/PaymentStatusChipRenderer';
import { customerPaymentRankStatusesCompare } from '../comparators/customerPaymentRankStatusesCompare';
import type { Currency } from '@features/products/models/product.constants';
import { formatPrice } from '@shared/utils/formatPrice';

interface ColumnArgsProps {
  t: TFunction;
  language: string;
  displayCurrency: Currency;
}

export function createCustomerDetailsGridColumns({ 
  t,
  language,
  displayCurrency
}: ColumnArgsProps): ColDef<CustomerPayment>[] {
  return [
    {
      field: "amount",
      headerName: t("common:labels.amount"),
      minWidth: 140,
      flex: 1,
      type: "rightAligned",
      valueFormatter: (params) =>
        formatPrice(
          params.value,
          params.data?.currency ?? "USD",
          displayCurrency,
          language
        )
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
      comparator: customerPaymentRankStatusesCompare
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
