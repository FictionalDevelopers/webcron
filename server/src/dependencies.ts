import { Repository as WebhookRepository } from './components/webhooks';
import { createInmemoryWebhookRepository } from './implementations/inmemory-repository';
import { createUnixCrontabAdapter } from './implementations/unix-crontab.adapter';
import { Adapter as CrontabAdapter } from './components/cron';

export const webhookRepository: WebhookRepository = createInmemoryWebhookRepository();
export const unixCrontabAdapter: CrontabAdapter = createUnixCrontabAdapter();
