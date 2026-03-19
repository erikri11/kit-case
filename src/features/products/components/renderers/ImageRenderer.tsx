import type { ICellRendererParams } from "ag-grid-enterprise";
import { Box, Stack } from "@mui/material";
import { resolveImageUrl } from "@shared/utils/resolveImageUrl";
import type { Product } from "@features/products/models/product.model";

export function ImageRenderer(props: ICellRendererParams<Product, string | null>) {
    if (!props.value) return null;

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${resolveImageUrl(props.value)})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: 1,
          height: 40,
          width: 40,
        }}
      />
    </Stack>
    );
  }
