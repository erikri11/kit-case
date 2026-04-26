import { Navigate } from "react-router-dom";
import { useAuth } from "@shared/context/auth/useAuth";
import type { RoleEnum } from "@shared/types/roleEnum";
import { useUserRights } from "@shared/context/userRights/useUserRights";
import UnauthorizedPage from "@pages/UnauthorizedPage";
import { ROLE_HIERARCHY } from "@shared/constants/roleHierarchy";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: RoleEnum[];
}

export function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {

  const { user } = useAuth();
  const { role } = useUserRights();

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  const hasAccess =
    !allowedRoles ||
    allowedRoles.some(
      (allowedRole) =>
        ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[allowedRole]
    );

  if (!hasAccess) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}
