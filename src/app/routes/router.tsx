import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CenteredSpinner } from "@layouts/CenteredSpinner";
import { ROLES } from "@shared/models/constants/role.constants";
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
            <ProtectedRoute allowedRoles={[ROLES.USER]}>
              <OverviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <ProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers/*"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <CustomersRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
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
