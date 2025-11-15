export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: string;
  username: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "SELLER";
}

export type UserRole = "ADMIN" | "MANAGER" | "SELLER";
