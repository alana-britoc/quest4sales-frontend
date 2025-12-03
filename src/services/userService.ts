import { api } from "@/lib/api";
import type { User, UpdateUserRequest, CreateUserRequest } from "@/dtos/UserDTOs";
import type { Page, PaginationParams } from "@/dtos/PaginationDTOs";

export const userService = {
  async getUsers(params?: PaginationParams): Promise<Page<User>> {
    const { data } = await api.get<Page<User>>("/users", { params });
    return data;
  },

  async getUserById(id: string): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async getUserByEmail(email: string): Promise<User> {
    const { data } = await api.get<User>(`/users/email/${email}`);
    return data;
  },

  async getSellers(params?: PaginationParams): Promise<Page<User>> {
    const { data } = await api.get<Page<User>>("/users/sellers", { params });
    return data;
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const { data } = await api.post<User>("/users", userData);
    return data;
  },

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const { data } = await api.put<User>(`/users/${id}`, userData);
    return data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async getMyProfile(): Promise<User> {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  async updateMyProfile(userData: UpdateUserRequest): Promise<User> {
    const { data } = await api.put<User>("/users/me", userData);
    return data;
  },
};
