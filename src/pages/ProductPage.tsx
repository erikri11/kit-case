import { useTranslation } from 'react-i18next';
import { PageTitle } from '../widgets/PageTitle/PageTitle';

export function ProductPage() {
  const { t } = useTranslation("products");

  return (
    <>
      <PageTitle 
        title={t("products:pageTitle.title")} 
        subtitle={t("products:pageTitle.subtitle")} 
      />
  </>
  );
}

export default ProductPage;
