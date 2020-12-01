import { Router, Request } from 'express';
import { parseExpression } from 'cron-parser';
import { CreateWebhookPayload, Webhook } from '@webcron/entities/webhook';
import { service as webhookService } from './index';
import { ApplicationError } from '../../errors/ApplicationError';

export const router = Router();

router.get('/', async (req, res) => {
  const webhooks = await webhookService.getWebhooks();

  return res.json(webhooks);
});

type CreateWebhookRequest = Request<{}, Webhook | { message: string }, Partial<CreateWebhookPayload>>;
router.post('/', async (req: CreateWebhookRequest, res, next) => {
  const {
    body: { url, schedule },
  } = req;

  if (!url || !schedule) {
    return next(new ApplicationError('Url and schedule are required.'));
  }

  try {
    parseExpression(schedule);
  } catch (e) {
    return next(new ApplicationError('Invalid schedule expression'));
  }

  const webhook = await webhookService.createWebhook({ url, schedule });

  return res.json(webhook);
});
