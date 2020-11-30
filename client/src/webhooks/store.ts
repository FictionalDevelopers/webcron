import type { Webhook } from '@webcron/entities/webhook';
import { Readable, writable } from 'svelte/store';
import { getWebhooks } from './api';

const store = writable<Webhook[]>([], (set) => {
  getWebhooks().then(set)
});

export const webhookStore: Readable<Webhook[]> = {
  subscribe: store.subscribe,
};

export function addWebhook(hook: Webhook) {
  store.update((hooks) => [...hooks, hook])
}