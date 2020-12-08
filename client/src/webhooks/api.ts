import { api, handleError } from '../api.client';
import type { CreateWebhookPayload } from '../entities/webhook';

export async function createWebhook(hook: CreateWebhookPayload) {
  return api.post('routes-addWebhook', { json: hook }).json().catch(handleError);
}

export async function getWebhooks() {
  return api.get('routes-getWebhooks').json().catch(handleError);
}
