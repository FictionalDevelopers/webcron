import { api } from '../api.client';

export async function createWebhook(url: string) {
  return api.post('webhooks', {
    json: { url }
  }).json();
}
export async function getWebhooks() {
  return api.get('webhooks').json();
}
