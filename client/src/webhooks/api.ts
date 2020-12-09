import { api, handleError } from '../api.client';
import type { CreateWebhookPayload } from '../entities/webhook';
import type { WebhookHistoryDocument } from '../entities';

export async function createWebhook(hook: CreateWebhookPayload) {
  return api.post('routes-addWebhook', { json: hook }).json().catch(handleError);
}

export async function getWebhooks() {
  return api.get('routes-getWebhooks').json().catch(handleError);
}

// @TODO Add routing (Infinite Scroll)
export async function getHistory(id: string): Promise<WebhookHistoryDocument[]> {
  return api.get('routes-getHistory', { searchParams: { id } })
    .json<WebhookHistoryDocument[]>()
    .catch(handleError);
}
