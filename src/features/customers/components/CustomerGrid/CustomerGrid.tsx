import { useEffect, useState } from "react";
import type { Customer } from "@features/customers/models/customer";
import { CustomersApi } from "@features/customers/api/customersApi";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import { useTranslation } from "react-i18next";
import { createCustomerGridColumns } from "./createCustomerGridColumns";
import { CustomerUpsertDialog } from "../CustomerUpsertDialog/CustomerUpsertDialog";
import CustomerDeleteDialog from "../CustomerDeleteDialog/CustomerDeleteDialog";
import { useNavigate } from "react-router-dom";

export function CustomersGrid() {
  const { t } = useTranslation(['common', 'customers']);
  const navigate = useNavigate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [updateCustomer, setUpdateCustomer] = useState<Customer | undefined>();
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | undefined>();

  const headers = createCustomerGridColumns({ 
    t,
    onEdit: setUpdateCustomer,
    onDelete: setDeleteCustomer,
    onOpenDetails: (customer) =>
      navigate(`/admin/customers/details/${customer.id}`)
  });
  
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const apiCustomers = await CustomersApi.get();
        setCustomers(apiCustomers);
      } catch (error) {
        console.error('Failed to load customers', error);
      } 
    };
    loadCustomers();
  }, []);

  // TODO: Remove after testing
  console.log('Loaded customers:', customers);

  return (
    <>
      <DataGridTable
        data={customers}
        headers={headers}
        isAddButtonVisible
        onAddButtonClick={() => setIsAddOpen(true)}
      />

      {isAddOpen && (
        <CustomerUpsertDialog
          open
          mode="add"
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {updateCustomer && (
        <CustomerUpsertDialog
          open
          mode="edit"
          customerId={updateCustomer.id}
          initialCustomer={updateCustomer}
          onClose={() => setUpdateCustomer(undefined)}
        />
      )}

      {deleteCustomer && (
        <CustomerDeleteDialog
          open
          customer={deleteCustomer}
          onClose={() => setDeleteCustomer(undefined)}
        />
      )}
    </>
  );
}
