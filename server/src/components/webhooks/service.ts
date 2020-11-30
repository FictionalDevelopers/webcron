import { CreateWebhookPayload } from '@webcron/entities/webhook';
import { Repository } from './repository';
import { Adapter as CrontabAdapter } from '../cron';

export function WebhookService(webhookRepository: Repository, crontabAdapter: CrontabAdapter) {
  return {
    createWebhook: createWebhook(webhookRepository, crontabAdapter),
    getWebhooks: getWebhooks(webhookRepository),
  };
}

function createWebhook(webhookRepository: Repository, crontabAdapter: CrontabAdapter) {
  return async (hook: CreateWebhookPayload) => {
    const webhook = await webhookRepository.createWebhook(hook);

    await crontabAdapter.registerTask({
      id: webhook.id,
      schedule: webhook.schedule,
      url: webhook.url,
    });

    return webhook;
  };
}

function getWebhooks(webhookRepository: Repository) {
  return () => {
    return webhookRepository.getAllWebhooks();
  }
}
