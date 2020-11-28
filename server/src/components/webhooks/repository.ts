import { Webhook } from '@webcron/entities';

export interface Repository {
  createWebhook(url: string): Promise<Webhook>;
  getAllWebhooks(): Promise<Webhook[]>;
}
