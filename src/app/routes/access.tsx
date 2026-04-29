import type { JSX } from "react";
import { ROLES, type Role } from "../../shared/models/constants/role.constants";
import UnauthorizedPage from "@pages/UnauthorizedPage";

export const checkAccess = (
  component: JSX.Element, 
  userRoles: Role[], 
  requiredRole: Role
) => {
  const { hasAccess } = checkUserAccess(userRoles, requiredRole);
  return hasAccess ? component : <UnauthorizedPage />;
}

export function checkUserAccess(
  userRoles: Role[], 
  requiredAccess: Role = ROLES.USER
) {
  let hasAccess = false;
  if (userRoles.includes(ROLES.ADMIN)) return { hasAccess: true, noAccessMessage: "" };
  else if (requiredAccess === ROLES.ADMIN) hasAccess = userRoles.includes(ROLES.ADMIN);
  else if (requiredAccess === ROLES.USER) hasAccess = true;
  else hasAccess = true;

  const noAccessMessage = hasAccess ? "" : `Rettighetsnivået ditt er ${userRoles} og må være ${requiredAccess} for tilgang`;
  return { hasAccess, noAccessMessage };
}

export const checkMenuAccess = (component: JSX.Element, userRoles: Role[], requiredRole?: Role) => {
  const { hasAccess } = checkUserAccess(userRoles, requiredRole);
  if (!requiredRole) return component;
  return hasAccess ? component : null;
}
