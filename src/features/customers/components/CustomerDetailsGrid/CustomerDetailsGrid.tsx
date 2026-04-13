import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { createCustomerDetailsGridColumns } from "./createCustomerDetailsGridColumns";
import { useTranslation } from "react-i18next";
import type { CustomerPayment } from "@features/customers/models/customer.payment.model";
import useCurrency from "@shared/context/currency/useCurrency";

interface CustomerDetailsGridProps {
   payments: CustomerPayment[];
}

export function CustomerDetailsGrid({ 
  payments
}: CustomerDetailsGridProps) {
  
  const { t, i18n } = useTranslation(["common", "customers"]);
  const { currency: displayCurrency } = useCurrency();
  
  const headers = createCustomerDetailsGridColumns({ 
    t, 
    language: i18n.language, 
    displayCurrency 

  });

  return (
    <DataGridTable<CustomerPayment>
      data={payments}
      headers={headers}
      disableSearch
      isPaginationEnabled
    />
  );
}

export default CustomerDetailsGrid;
