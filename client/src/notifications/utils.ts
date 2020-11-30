import { Notification, NotificationType } from './types';

export function isErrorType(type: NotificationType) {
  return type === NotificationType.Error;
}

export function isMessageType(type: NotificationType) {
  return type === NotificationType.Message;
}

export function isSuccessType(type: NotificationType) {
  return type === NotificationType.Success;
}

export function buildNotification(message: string, type: NotificationType): Notification {
  return {
    id: btoa(message + Date.now()),
    message,
    type,
  };
}
