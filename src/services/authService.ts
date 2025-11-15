import { api } from "@/lib/api";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/dtos/AuthDTOs";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },

  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const { data } = await api.post<RefreshTokenResponse>(
      "/auth/refresh",
      request
    );
    return data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
};
