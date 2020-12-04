import { webhookRepository } from '../../dependencies';
import { WebhookService } from './service-factory';

export const webhookService = WebhookService(webhookRepository);
