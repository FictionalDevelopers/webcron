import { CreateWebhookPayload, Webhook } from '@webcron/entities/webhook';
import { Repository as WebhookRepository } from '../components/webhooks';

export function createInmemoryWebhookRepository(): WebhookRepository {
  const webhooks: Webhook[] = [];

  async function createWebhook(hook: CreateWebhookPayload): Promise<Webhook> {
    const id = `${Date.now()}`;
    const webhook = { id, ...hook };

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
