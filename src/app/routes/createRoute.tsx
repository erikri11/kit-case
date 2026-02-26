import type { JSX } from "react";
import { Route } from "react-router-dom";
import { RoleEnum } from "../../shared/types/roleEnum";
import { checkAccess } from "./access";

export const createRoute = (
  path: string, 
  component: JSX.Element, 
  userRoles: RoleEnum[], 
  requiredRole: RoleEnum = RoleEnum.USER
) => (
  <Route path={path} element={checkAccess(component, userRoles, requiredRole)} />
)
