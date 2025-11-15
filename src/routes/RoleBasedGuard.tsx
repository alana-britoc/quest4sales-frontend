import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/context/AuthContext";


type RoleBasedGuardProps = {
  allowedRoles: UserRole[];
};

export function RoleBasedGuard({ allowedRoles }: RoleBasedGuardProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}