import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCustomers } from "@shared/hooks/useCustomers";
import DataGridTable from "@shared/components/DataGridTable/DataGridTable";
import type { Customer } from "@features/customers/models/customer.model";
import { createCustomerGridColumns } from "./createCustomerGridColumns";
import { CustomerUpsertDialog } from "../CustomerUpsertDialog/CustomerUpsertDialog";
import CustomerDeleteDialog from "../CustomerDeleteDialog/CustomerDeleteDialog";

export function CustomersGrid() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const customers = useCustomers();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState<Customer | undefined>();
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | undefined>();

  const headers = createCustomerGridColumns({ 
    t,
    onEdit: setUpdateCustomer,
    onDelete: setDeleteCustomer,
    onOpenDetails: (customer) =>
      navigate(`/admin/customers/details/${customer.id}`)
  });
  
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
