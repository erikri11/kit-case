import { Routes, Route, Navigate } from "react-router-dom";
import CustomersPage from "@pages/CustomersPage";
import CustomerDetailsPage from "@pages/CustomerDetailsPage";

export default function CustomersRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" replace />} />
      <Route path="list" element={<CustomersPage />} />
      <Route path="details/:customerId" element={<CustomerDetailsPage />} />
    </Routes>
  );
}
