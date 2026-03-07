import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createRoute } from "./createRoute";
import { CenteredSpinner } from "@layouts/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";
import { useUserRights } from "@shared/context/userRights/useUserRights";

const TasksPage = lazy(() => import("@pages/TasksPage"));
// const Orders = lazy(() => import("@pages/Orders/Orders"));
// const Products = lazy(() => import("@pages/Products/Products"));
const CustomersRoutes = lazy(() => import("@pages/CustomersRoutes"));

export function AppRoutes() {
  const { role } = useUserRights();

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        {createRoute('/dashboard', <TasksPage />, [role], RoleEnum.USER)}
        {createRoute('/admin/orders', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/products', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/customers/*', <CustomersRoutes />, [role], RoleEnum.ADMIN)}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
