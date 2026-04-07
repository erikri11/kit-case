import type { ProductStatus } from "@features/products/models/product.constants";
import type { Product } from "@features/products/models/product.model";
import { PRODUCT_STATUS_CONFIG } from "@features/products/models/productStatusConfig";
import createChipRenderer from "@shared/renderers/createChipRenderer";

export const ProductStatusChipRenderer =
  createChipRenderer<Product, ProductStatus>(PRODUCT_STATUS_CONFIG);

export default ProductStatusChipRenderer;