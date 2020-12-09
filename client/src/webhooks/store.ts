import { Readable, writable } from 'svelte/store';
import type { Webhook } from '../entities';
import { getWebhooks } from './api';

const webhooks = writable<Webhook[]>([], (set) => {
  getWebhooks().then(set);
});

export const webhookStore: Readable<Webhook[]> = {
  subscribe: webhooks.subscribe,
};

export function addWebhook(hook: Webhook) {
  webhooks.update((hooks) => [...hooks, hook]);
}
