export type NotificationType = "MUDANCA_POSICAO" | "AVISO" | "PREMIACAO";

export interface Notification {
  id: number;
  tipo: NotificationType;
  mensagem: string;
  lida: boolean;
  createdAt: string;
}

export interface MarkNotificationReadRequest {
  notificationId: number;
}

export interface ClearAllNotificationsRequest {
  userId: number;
}
