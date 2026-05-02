import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';
import { ProductsGrid } from '@features/products/components/ProductsGrid/ProductsGrid';
import { useProducts } from '@features/products/hooks/useProducts';

export function ProductPage() {
  const { t } = useTranslation("products");
  const { products } = useProducts();
  
  return (
    <>
      <PageTitle 
        title={t("products:pageTitle.title")} 
        subtitle={t("products:pageTitle.subtitle")} 
      />

       <ProductsGrid 
          products={products}
       />
    </>
  );
}

export default ProductPage;
