import { Repository } from './repository';
import { CreateWebhookPayload } from '@webcron/entities/webhook';

export function WebhookService(webhookRepository: Repository) {
  return {
    createWebhook: createWebhook(webhookRepository),
    getWebhooks: getWebhooks(webhookRepository),
  };
}

function createWebhook(webhookRepository: Repository) {
  return (hook: CreateWebhookPayload) => {
    return webhookRepository.createWebhook(hook);
  };
}

function getWebhooks(webhookRepository: Repository) {
  return () => {
    return webhookRepository.getAllWebhooks();
  }
}
