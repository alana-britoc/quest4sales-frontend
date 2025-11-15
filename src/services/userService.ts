import { api } from "@/lib/api";
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  UserStats,
  UserProgressItem,
} from "@/dtos/UserDTOs";

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>("/users/me");
    return data;
  },

  async updateProfile(request: UpdateProfileRequest): Promise<UserProfile> {
    const { data } = await api.put<UserProfile>("/users/me", request);
    return data;
  },

  async updatePassword(request: UpdatePasswordRequest): Promise<void> {
    await api.put("/users/me/password", request);
  },

  async getUserStats(): Promise<UserStats> {
    const { data } = await api.get<UserStats>("/users/me/stats");
    return data;
  },

  async getUserProgress(): Promise<UserProgressItem[]> {
    const { data } = await api.get<UserProgressItem[]>("/users/me/progress");
    return data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await api.post<{ avatarUrl: string }>(
      "/users/me/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
};
