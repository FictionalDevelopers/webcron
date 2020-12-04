import { CreateWebhookPayload, Webhook } from '../../entities/webhook';

export interface Repository {
  createWebhook(hook: CreateWebhookPayload): Promise<Webhook>;
  getAllWebhooks(): Promise<Webhook[]>;
}
