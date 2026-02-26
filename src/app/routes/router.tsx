import { Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";
import { createRoute } from "./createRoute";
import { useUserRights } from "../../shared/context/userRights/useUserRights";
import { CenteredSpinner } from "../../layout/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";

const TasksPage = lazy(() => import("../../pages/TasksPage"));
// const Orders = lazy(() => import("@pages/Orders/Orders"));
// const Products = lazy(() => import("@pages/Products/Products"));
// const Customers = lazy(() => import("@pages/Customers/Customers"));

export function AppRoutes() {
  const { role } = useUserRights();

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        {createRoute('/dashboard', <TasksPage />, [role], RoleEnum.USER)}
        {createRoute('/admin/orders', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/products', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/customers', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/customers/list', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/customers/create', <TasksPage />, [role], RoleEnum.ADMIN)}
        {createRoute('/admin/customers/details/:id', <TasksPage />, [role], RoleEnum.ADMIN)}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
