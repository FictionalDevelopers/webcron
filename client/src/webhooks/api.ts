import { api } from '../api.client';

export async function addWebhook(url: string) {
  return api.post('webhooks', {
    json: { url }
  });
}
export async function getWebhooks() {
  return api.get('webhooks');
}
