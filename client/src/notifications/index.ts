import { error, message, notificationStore, success } from './store';

export { default as NotificationsContainer } from './Container.svelte';

export { notificationStore };

export const notify = {
  message,
  success,
  error,
};

export type { Notification } from './types';
export { NotificationType } from './types';
