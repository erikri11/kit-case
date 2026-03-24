import { useState } from "react";
import type { ICellRendererParams } from "ag-grid-enterprise";
import { Box, Dialog, DialogContent, IconButton, Stack } from "@mui/material";
import { resolveImageUrl } from "@shared/utils/resolveImageUrl";
import type { Product, ProductImage } from "@features/products/models/product.model";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

export function ImageRenderer(props: ICellRendererParams<Product, ProductImage | null>) {
  const [open, setOpen] = useState(false);

  const hasImage = !!props.value?.url;

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%"
        }}
      >
        {hasImage 
          ? 
            <Box
              onClick={() => setOpen(true)}
              sx={{
                backgroundImage: `url(${resolveImageUrl(props.value!.url)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                cursor: "pointer",
                borderRadius: 1,
                height: 40,
                width: 40
              }}
            /> 
          : 
            <Box
              sx={{
                height: 40,
                width: 40,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
              }}
            >
              <ImageIcon color="disabled" />
            </Box>
        }
      </Stack>

      {hasImage && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent sx={{ p: 2, position: "relative" }}>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                bgcolor: "background.paper",
                top: 8,
                right: 8,
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              component="img"
              src={resolveImageUrl(props.value!.url)}
              alt={props.value?.fileName ?? "Product image"}
              sx={{
                width: "100%",
                maxHeight: "50vh",
                objectFit: "contain",
                borderRadius: 1
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ImageRenderer;
