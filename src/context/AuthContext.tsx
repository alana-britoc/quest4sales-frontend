import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import type { UserRole } from "@/dtos/AuthDTOs";

export type { UserRole };

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
};

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_TOKEN_KEY = "q4s_auth_token";
const REFRESH_TOKEN_KEY = "q4s_refresh_token";
const USER_DATA_KEY = "q4s_user_data";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_DATA_KEY);

        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });

      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));

      setUser(response.user);

      const roleRoutes: Record<UserRole, string> = {
        VENDEDOR: "/dashboard",
        GERENTE: "/gerente/dashboard",
        ADMIN: "/admin/usuarios",
      };

      navigate(roleRoutes[response.user.role] || "/login");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout().catch(() => {});

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}