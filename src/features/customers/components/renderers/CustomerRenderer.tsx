import type { Customer } from "@features/customers/models/model/customer.model";
import { CustomerInfo } from "@shared/components/CustomerInfo/CustomerInfo";
import type { ICellRendererParams } from "ag-grid-enterprise";

export function CustomerRenderer(params: ICellRendererParams<Customer, string>) {
  if (!params.data) return null;

  return (
    <CustomerInfo
      avatar={params.data.avatar}
      name={params.data.name}
      email={params.data.email}
    />
  );
}

export default CustomerRenderer;
