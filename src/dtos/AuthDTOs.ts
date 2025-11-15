export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    department?: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export type UserRole = "VENDEDOR" | "GERENTE" | "ADMIN";
