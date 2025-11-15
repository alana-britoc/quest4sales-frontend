import { api } from "@/lib/api";
import type { Notification } from "@/dtos/NotificationDTOs";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const { data } = await api.get<Notification[]>("/notifications");
    return data;
  },

  async getNotificationById(id: string): Promise<Notification> {
    const { data } = await api.get<Notification>(`/notifications/${id}`);
    return data;
  },

  async getUnreadNotifications(): Promise<Notification[]> {
    const { data } = await api.get<Notification[]>("/notifications/unread");
    return data;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  },
};
