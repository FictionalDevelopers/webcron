import { api } from '../api.client';
import type { CreateWebhookPayload } from '@webcron/entities/webhook';

export async function createWebhook(hook: CreateWebhookPayload) {
  return api.post('webhooks', {
    json: hook
  }).json();
}

export async function getWebhooks() {
  return api.get('webhooks').json();
}
