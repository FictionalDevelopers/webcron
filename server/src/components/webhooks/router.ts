import { Router, Request } from 'express';
import { service as webhookService } from './index';
import { CreateWebhookPayload, Webhook } from '@webcron/entities/webhook';

export const router = Router();

router.get('/', async (req, res) => {
  const webhooks = await webhookService.getWebhooks();

  return res.json(webhooks);
});

router.post('/', async (req: Request<{}, Webhook, CreateWebhookPayload>, res) => {
  const { body } = req;
  const webhook = await webhookService.createWebhook(body);

  return res.json(webhook);
});
