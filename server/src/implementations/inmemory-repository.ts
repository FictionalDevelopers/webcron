import { Webhook } from '@webcron/entities';
import { Repository as WebhookRepository } from '../components/webhooks';

export function createInmemoryWebhookRepository(): WebhookRepository {
  const webhooks: Webhook[] = [];

  async function createWebhook(url: string): Promise<Webhook> {
    const id = `${Date.now()}`;
    const webhook = { id, url };

    webhooks.push(webhook);

    return webhook;
  }

  async function getAllWebhooks() {
    return webhooks;
  }

  return {
    createWebhook,
    getAllWebhooks,
  };
}
