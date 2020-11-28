import { Repository } from './repository';

export function WebhookService(webhookRepository: Repository) {
  return {
    createWebhook: createWebhook(webhookRepository),
    getWebhooks: getWebhooks(webhookRepository),
  };
}

function createWebhook(webhookRepository: Repository) {
  return (url: string) => {
    return webhookRepository.createWebhook(url);
  };
}

function getWebhooks(webhookRepository: Repository) {
  return () => {
    return webhookRepository.getAllWebhooks();
  }
}
