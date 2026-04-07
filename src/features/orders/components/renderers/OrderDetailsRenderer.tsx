import { useMemo } from "react";
import type { ColDef, IDetailCellRendererParams } from "ag-grid-enterprise";
import { Box, Typography } from "@mui/material";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import type { OrderDetails } from "@features/orders/models/order.details.model";
import { formatCurrency } from "@shared/utils/formatCurrency";
import type { Currency } from "@features/products/models/product.constants";

interface OrderDetailRow {
  product: string;
  quantity: number;
  unitPrice: number;
  currency: Currency;
  amount: number;
}

export function OrderDetailRenderer(props: IDetailCellRendererParams<OrderDetails>) {
  const order = props.data;

  const columnDefs = useMemo<ColDef<OrderDetailRow>[]>(
    () => [
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
        valueFormatter: (params) =>
          formatCurrency(params.value, params.data?.currency ?? "USD")
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 140,
        valueFormatter: (params) =>
          formatCurrency(params.value, params.data?.currency ?? "USD")
      }
    ], []
  );

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
