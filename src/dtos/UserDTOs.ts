import type { UserRole } from "./AuthDTOs";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserStats {
  position: number;
  sales: number;
  points: number;
}

export interface UserProgressItem {
  id: number;
  label: string;
  current: number;
  total: number;
}
