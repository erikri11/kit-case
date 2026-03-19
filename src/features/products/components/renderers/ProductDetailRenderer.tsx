import { useMemo, type ReactNode } from "react";
import type { ColDef, ICellRendererParams, IDetailCellRendererParams } from "ag-grid-enterprise";
import { Box, Chip, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Product } from "@features/products/models/product.model";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { formatDate } from "@shared/utils/formatDate";

interface ProductDetailRow {
  label: string;
  value: ReactNode;
}

export function ProductDetailRenderer(props: IDetailCellRendererParams<Product>) {
  const product = props.data;

  const headers = useMemo<ColDef<ProductDetailRow>[]>(
    () => [
      {
        field: "label",
        headerName: "Field",
        flex: 1,
        minWidth: 180
      },
      {
        field: "value",
        headerName: "Value",
        flex: 2,
        minWidth: 220,
        filter: false,
        cellRenderer: (params: ICellRendererParams<ProductDetailRow, ReactNode>) => (
          params.value  
        ) 
      }
    ], []
  );

  if (!product) return null;

  const detailsData: ProductDetailRow[] = [
    { label: "Category", value: product.category },
    { label: "Type", value: product.type },
    { label: "Status", 
      value: (
        <Chip 
          label={product.status} 
          size="small" 
          variant="outlined" 
          icon={product.status === "Draft" ? <AccessTimeIcon /> : <CheckCircleIcon />}
          color={product.status === "Draft" ? "default" : "success"}
        /> 
      )
    }
  ];

  const stockAndInventoryData: ProductDetailRow[] = [
    { label: "SKU", value: product.sku },
    { label: "Quantity", value: product.quantity },
    { label: "Created at", value: formatDate(product.createdAt) }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">
        Details
      </Typography>

      <DataGridTable<ProductDetailRow>
        data={detailsData}
        headers={headers}
        disableSearch
        isPaginationEnabled={false}
      />

      <Typography variant="h4" sx={{ mt: 2 }}>
        Stock & Inventory
      </Typography>

       <DataGridTable<ProductDetailRow>
        data={stockAndInventoryData}
        headers={headers}
        disableSearch
        isPaginationEnabled={false}
      />
    </Box>
  );
}
