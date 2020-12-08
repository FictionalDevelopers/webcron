import { CreateWebhookPayload, Webhook } from '../../entities/webhook';
import { WebhookHistoryEntry } from '../../entities/webhook-history';

export interface Repository {
  createWebhook(hook: CreateWebhookPayload): Promise<Webhook>;
  getAllWebhooks(): Promise<Webhook[]>;
  getHistory(id: string): Promise<WebhookHistoryEntry[]>
}
