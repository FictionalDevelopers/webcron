import { Router } from 'express';
import { service as webhookService } from './index';

export const router = Router();

router.get('/', async (req, res) => {
  const webhooks = await webhookService.getWebhooks();

  return res.json(webhooks);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const webhook = await webhookService.createWebhook(body.url);

  return res.json({
    webhook,
  });
});
