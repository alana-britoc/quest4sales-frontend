import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleBasedGuard } from "./RoleBasedGuard";

import VendedorLayout from "@/components/layouts/VendedorLayout";
import GerenteLayout from "@/components/layouts/GerenteLayout";
import AdminLayout from "@/components/layouts/AdminLayout";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

import ManageUsersPage from "@/pages/admin/ManageUsersPage";
import GerenteDashboardPage from "@/pages/gerente/GerenteDashboardPage";
import CompeticoesPage from "@/pages/gerente/CompeticoesPage";
import EquipePage from "@/pages/gerente/EquipePage";
import { useAuth } from "@/context/AuthContext";

function RootRedirect() {
  const { user } = useAuth();

  if (user?.role === "SELLER") {
    return <Navigate to="/dashboard" replace />;
  }
  if (user?.role === "MANAGER") {
    return <Navigate to="/gerente/dashboard" replace />;
  }
  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/usuarios" replace />;
  }
  return <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RootRedirect />} />

        <Route element={<RoleBasedGuard allowedRoles={["SELLER"]} />}>
          <Route element={<VendedorLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="perfil" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<RoleBasedGuard allowedRoles={["MANAGER"]} />}>
          <Route element={<GerenteLayout />}>
            <Route path="gerente/dashboard" element={<GerenteDashboardPage />} />
            <Route path="gerente/competicoes" element={<CompeticoesPage />} />
            <Route path="gerente/equipe" element={<EquipePage />} />
          </Route>
        </Route>

        <Route element={<RoleBasedGuard allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="admin/usuarios" element={<ManageUsersPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}