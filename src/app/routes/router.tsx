import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CenteredSpinner } from "@layouts/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";
import { ProtectedRoute } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const OverviewPage = lazy(() => import("@pages/OverviewPage"));
const OrdersPage = lazy(() => import("@pages/OrdersPage"));
const ProductPage = lazy(() => import("@pages/ProductPage"));
const CustomersRoutes = lazy(() => import("@pages/CustomersRoutes"));
const TasksPage = lazy(() => import("@pages/TasksPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route path="/" element={<Navigate to="/overview" replace />} />

        <Route
          path="/overview"
          element={
            <ProtectedRoute allowedRoles={[RoleEnum.USER]}>
              <OverviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={[RoleEnum.ADMIN]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={[RoleEnum.ADMIN]}>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers/*"
          element={
            <ProtectedRoute allowedRoles={[RoleEnum.ADMIN]}>
              <CustomersRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute allowedRoles={[RoleEnum.ADMIN]}>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
