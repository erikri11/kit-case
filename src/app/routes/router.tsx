import { Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";
import { createRoute } from "./createRoute";
import { useUserRights } from "../../shared/context/userRights/userRights";
import { CenteredSpinner } from "../../layout/CenteredSpinner";
import { RoleEnum } from "@shared/types/roleEnum";

const TasksPage = lazy(() => import("../../pages/TasksPage"));
// const Orders = lazy(() => import("@pages/Orders/Orders"));
// const Products = lazy(() => import("@pages/Products/Products"));
// const Customers = lazy(() => import("@pages/Customers/Customers"));

export function AppRoutes() {
  const { role } = useUserRights();

  return (
    <Suspense fallback={<CenteredSpinner />} >
      <Routes>
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
        {createRoute("/dashboard", <TasksPage />, [role], RoleEnum.USER)}
        {/* {createRoute("/admin/orders", <Orders />, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/products", <Products/>, [role], RoleEnum.ADMIN)}
        {createRoute("/admin/customers", <Customers />, [role], RoleEnum.ADMIN)} */}
      </Routes>
    </Suspense>
  );
}
