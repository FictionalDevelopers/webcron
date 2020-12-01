import { WebhookService } from './service';
import { webhookRepository, unixCrontabAdapter } from '../../dependencies';

export { Repository } from './repository';
export { router } from './router';

export const service = WebhookService(webhookRepository, unixCrontabAdapter);

