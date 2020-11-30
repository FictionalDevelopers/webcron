import { CreateWebhookPayload, Webhook } from '@webcron/entities/webhook';

export interface Repository {
  createWebhook(hook: CreateWebhookPayload): Promise<Webhook>;
  getAllWebhooks(): Promise<Webhook[]>;
}
