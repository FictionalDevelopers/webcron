import { Readable, writable } from 'svelte/store';
import type { Notification } from './types';
import { NotificationType } from './types';
import { buildNotification } from './utils';

const store = writable<Notification[]>([]);

export const notificationStore: Readable<any> = {
  subscribe: store.subscribe,
};

export const error = buildNotifyFunction(NotificationType.Error);
export const message = buildNotifyFunction(NotificationType.Message);
export const success = buildNotifyFunction(NotificationType.Success);

type Dismiss = () => void;
type Options = {
  timeout?: number;
  dismissAll?: boolean;
};

function buildNotifyFunction(type: NotificationType) {
  return (message: string, options: Options = {}): Dismiss => {
    const { timeout, dismissAll = false } = options;

    const notification = buildNotification(message, type);
    const dismiss = () => {
      acknowledge(notification.id);
    };

    store.update(n => dismissAll ? [notification] : [...n, notification]);

    if (timeout) {
      setTimeout(dismiss, timeout);
    }

    return dismiss;
  };
}

export function acknowledge(id: string) {
  store.update(n => n.filter((n) => n.id !== id));
}
