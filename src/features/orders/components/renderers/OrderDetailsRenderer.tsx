import { useMemo } from "react";
import type { ColDef, IDetailCellRendererParams } from "ag-grid-enterprise";
import { Box, Typography } from "@mui/material";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import type { OrderDetails } from "@features/orders/models/model/order.details.model";
import type { Currency } from "@features/products/models/product.constants";
import { useTranslation } from "react-i18next";
import useCurrency from "@shared/context/currency/useCurrency";
import { formatPrice } from "@shared/utils/formatPrice";

interface OrderDetailRow {
  product: string;
  quantity: number;
  unitPrice: number;
  currency: Currency;
  amount: number;
}

export function OrderDetailRenderer(props: IDetailCellRendererParams<OrderDetails>) {
  const { i18n } = useTranslation();
  const { currency: displayCurrency } = useCurrency();

  const order = props.data;
  const language = i18n.language;

  const columnDefs = useMemo<ColDef<OrderDetailRow>[]>(() => {
    return [
      {
        field: "product",
        headerName: "Product",
        flex: 1,
        minWidth: 180
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
        minWidth: 120
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        flex: 1,
        minWidth: 140,
        valueFormatter: (params) => (
          formatPrice(
            Number(params.value ?? 0),
            params.data?.currency ?? "USD",
            displayCurrency,
            language
          )
        )
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 140,
         valueFormatter: (params) => (
          formatPrice(
            Number(params.value ?? 0),
            params.data?.currency ?? "USD",
            displayCurrency,
            language
          )
        )
      }
    ];
  }, [displayCurrency, language]);

  if (!order) return null;

  const rowData: OrderDetailRow[] = order.lineItems.map((item) => ({
    product: item.productName,
    quantity: item.quantity,
    unitPrice: item.unitAmount,
    currency: item.currency,
    amount: item.totalAmount
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Line items
      </Typography>

      <DataGridTable<OrderDetailRow>
        data={rowData}
        headers={columnDefs}
        disableSearch
        isPaginationEnabled={false}
      />
    </Box>
  );
}

export default OrderDetailRenderer;
