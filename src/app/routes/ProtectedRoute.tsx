import { Navigate } from "react-router-dom";
import { useAuth } from "@shared/context/auth/useAuth";
import type { RoleEnum } from "@shared/types/roleEnum";
import { useUserRights } from "@shared/context/userRights/useUserRights";
import UnauthorizedPage from "@pages/UnauthorizedPage";

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

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}
