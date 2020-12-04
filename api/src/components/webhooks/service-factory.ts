import { CreateWebhookPayload } from '../../entities/webhook';
import { Repository } from './repository';

export function WebhookService(webhookRepository: Repository) {
  return {
    createWebhook: createWebhook(webhookRepository),
    getWebhooks: getWebhooks(webhookRepository),
  };
}

function createWebhook(webhookRepository: Repository) {
  return async (hook: CreateWebhookPayload) => {
    return webhookRepository.createWebhook(hook);
  };
}

function getWebhooks(webhookRepository: Repository) {
  return () => {
    return webhookRepository.getAllWebhooks();
  };
}
