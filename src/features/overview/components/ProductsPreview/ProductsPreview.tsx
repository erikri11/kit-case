import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrolleyIcon from '@mui/icons-material/Trolley';
import { purple } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { getPreviewHeight } from "@shared/utils/getPreviewHeight";
import { useTranslation } from "react-i18next";
import type { Product } from "@features/products/models/product.model";

interface ProductsPreviewProps {
  products: Product[];
}

export function ProductsPreview({ 
  products 
}: ProductsPreviewProps) {

  const navigate = useNavigate();
  const { t } = useTranslation("common");
  
  const ROW_COUNT = 3;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar 
          sx={{
              bgcolor: purple[300],
              border: "2px solid",
              borderColor: purple[500]
            }}
          >
            <TrolleyIcon />
          </Avatar>
        }
        title={t("common:labels.latestProducts")}
        subheader={new Date().toLocaleDateString()}
      />
      <CardContent sx={{ 
        py: "8px", 
        height: getPreviewHeight(ROW_COUNT) }}
      >
        {products.length === 0 ? (
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TrolleyIcon color="disabled" />
            <Typography variant="body2" color="text.secondary">
              {t("common:labels.noProductsYet")}
            </Typography>
          </Stack>
        ) : (
          <List disablePadding>
            {products.map((product) => (
              <ProductPreviewItem key={product.id} product={product} />
            ))}
          </List>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button 
          color="primary" 
          size="small"
          endIcon={<ArrowForwardIcon />} 
          onClick={() => navigate("/admin/products")}
        >
          {t("common:labels.viewAllProducts")}
        </Button>
      </CardActions>
    </Card>
  );
}

interface ProductPreviewItemProps {
  product: Product;
}

function ProductPreviewItem({ 
  product 
}: ProductPreviewItemProps) {

  const { t } = useTranslation(["products", "common"]);

  return (
    <ListItem disableGutters>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          height: "100%",
          mr: 2
        }}
      >
        <Avatar 
          variant="square" 
          src={product.image?.url} 
          alt={product.name} 
          sx={{ width: 40, height: 40 }}
          >
            {!product.image?.url && 
              <TrolleyIcon sx={{ color: "text.primary" }} />
            }
        </Avatar>
      </Stack>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="body2" noWrap>
            {product.name}
          </Typography>
        }
        secondary={
          <Typography 
            color="text.secondary" 
            variant="body2" 
            noWrap
          >
            {product.category
              ? t(`products:category.${product.category}`)
              : t("common:labels.noCategory")}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default ProductsPreview;
