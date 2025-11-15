import { api } from "@/lib/api";
import type { Notification } from "@/dtos/NotificationDTOs";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const { data } = await api.get<Notification[]>("/notifications");
    return data;
  },

  async markAsRead(notificationId: number): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await api.put("/notifications/read-all");
  },

  async clearAll(): Promise<void> {
    await api.delete("/notifications");
  },
};
