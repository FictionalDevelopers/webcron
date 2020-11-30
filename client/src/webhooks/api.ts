import type { CreateWebhookPayload } from '@webcron/entities/webhook';
import { api, handleError } from '../api.client';

export async function createWebhook(hook: CreateWebhookPayload) {
  return api.post('webhooks', { json: hook })
    .json()
    .catch(handleError);
}

export async function getWebhooks() {
  return api.get('webhooks').json();
}
