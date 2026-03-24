import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { createCustomerDetailsGridColumns } from "./createCustomerDetailsGridColumns";
import { useTranslation } from "react-i18next";
import type { CustomerPayment } from "@features/customers/models/customer.payment.model";

interface CustomerDetailsGridProps {
   payments: CustomerPayment[];
}

export function CustomerDetailsGrid({ 
  payments
}: CustomerDetailsGridProps) {
  
  const { t } = useTranslation(["common", "customers"]);

  const headers = createCustomerDetailsGridColumns({ t });

  // TODO:: Remove after testing
  console.log(`Loaded payments:`, payments);

  return (
    <DataGridTable<CustomerPayment>
      data={payments}
      headers={headers}
      disableSearch
      isPaginationEnabled={false}
    />
  );
}

export default CustomerDetailsGrid;
