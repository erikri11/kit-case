import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createRoute } from "./createRoute";
import { CenteredSpinner } from "@layouts/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";
import { useUserRights } from "@shared/context/userRights/useUserRights";
import { ProtectedRoute } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const OverviewPage = lazy(() => import("@pages/OverviewPage"));
const OrdersPage = lazy(() => import("@pages/OrdersPage"));
const ProductPage = lazy(() => import("@pages/ProductPage"));
const CustomersRoutes = lazy(() => import("@pages/CustomersRoutes"));
const TasksPage = lazy(() => import("@pages/TasksPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));

export function AppRoutes() {
  const { role } = useUserRights();

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        <Route path="/signup" element={ <PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {createRoute("/overview",  <ProtectedRoute><OverviewPage /></ProtectedRoute>, [role], RoleEnum.USER)}
        {createRoute("/admin/orders", <ProtectedRoute><OrdersPage /></ProtectedRoute>, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/products", <ProtectedRoute><ProductPage /></ProtectedRoute>, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/customers/*", <ProtectedRoute><CustomersRoutes /></ProtectedRoute>, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/tasks", <ProtectedRoute><TasksPage /></ProtectedRoute>, [role], RoleEnum.ADMIN)}

        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
