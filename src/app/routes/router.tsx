import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createRoute } from "./createRoute";
import { CenteredSpinner } from "@layouts/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";
import { useUserRights } from "@shared/context/userRights/useUserRights";

const OverviewPage = lazy(() => import("@pages/OverviewPage"));
const OrdersPage = lazy(() => import("@pages/OrdersPage"));
const ProductPage = lazy(() => import("@pages/ProductPage"));
const CustomersRoutes = lazy(() => import("@pages/CustomersRoutes"));
const TasksPage = lazy(() => import("@pages/TasksPage"));

export function AppRoutes() {
  const { role } = useUserRights();

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        {createRoute("/overview", <OverviewPage />, [role], RoleEnum.USER)}
        {createRoute("/admin/orders", <OrdersPage />, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/products", <ProductPage />, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/customers/*", <CustomersRoutes />, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/tasks", <TasksPage />, [role], RoleEnum.ADMIN)}
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
}
