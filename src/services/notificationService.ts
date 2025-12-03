import { api } from "@/lib/api";
import type { Notification } from "@/dtos/NotificationDTOs";

export const notificationService = {
  /**
   * Busca todas as notificações de um usuário
   */
  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    const { data } = await api.get<Notification[]>(`/notifications/user/${userId}`);
    return data;
  },

  /**
   * Busca notificações não lidas de um usuário
   */
  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    const { data } = await api.get<Notification[]>(`/notifications/user/${userId}/unread`);
    return data;
  },

  /**
   * Busca o contador de notificações não lidas
   */
  async getUnreadCount(userId: string): Promise<number> {
    const { data } = await api.get<{ count: number }>(`/notifications/user/${userId}/unread-count`);
    return data.count;
  },

  /**
   * Marca uma notificação como lida
   * IMPORTANTE: Usa PUT, não PATCH
   */
  async markAsRead(notificationId: string): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`);
  },

  /**
   * Marca todas as notificações de um usuário como lidas
   */
  async markAllAsRead(userId: string): Promise<void> {
    await api.put(`/notifications/user/${userId}/read-all`);
  },
};
