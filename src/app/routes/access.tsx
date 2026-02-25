import type { JSX } from "react";
import { RoleEnum } from "../../shared/types/roleEnum";
import UnauthorizedPage from "@pages/UnauthorizedPage";

export const checkAccess = (component: JSX.Element, userRoles: RoleEnum[], requiredRole: RoleEnum) => {
  const { hasAccess } = checkUserAccess(userRoles, requiredRole);
  return hasAccess ? component : <UnauthorizedPage />;
}

export function checkUserAccess(userRoles: RoleEnum[], requiredAccess: RoleEnum = RoleEnum.USER) {
  let hasAccess = false;
  if (userRoles.includes(RoleEnum.ADMIN)) return { hasAccess: true, noAccessMessage: "" };
  else if (requiredAccess === RoleEnum.ADMIN) hasAccess = userRoles.includes(RoleEnum.ADMIN);
  else if (requiredAccess === RoleEnum.USER) hasAccess = true;
  else hasAccess = true;

  const noAccessMessage = hasAccess ? "" : `Rettighetsnivået ditt er ${userRoles} og må være ${requiredAccess} for tilgang`;
  return { hasAccess, noAccessMessage };
}

export const checkMenuAccess = (component: JSX.Element, userRoles: RoleEnum[], requiredRole?: RoleEnum) => {
  const { hasAccess } = checkUserAccess(userRoles, requiredRole);
  if (!requiredRole) return component;
  return hasAccess ? component : null;
}
