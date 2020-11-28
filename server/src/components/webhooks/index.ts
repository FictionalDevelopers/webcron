import { WebhookService } from './service';
import { webhookRepository } from '../../dependencies';

export { Repository } from './repository';
export { router } from './router';

export const service = WebhookService(webhookRepository);

