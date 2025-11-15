export type NotificationType = "INFO" | "WARNING" | "SUCCESS" | "ERROR";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
