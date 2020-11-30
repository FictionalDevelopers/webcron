export enum NotificationType {
  Message,
  Error,
  Success
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationType,
}
