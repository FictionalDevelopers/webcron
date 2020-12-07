import { parseExpression } from 'cron-parser';
import * as functions from 'firebase-functions';
import { ApplicationError } from '../../errors/ApplicationError';
import { handleRequest } from '../../utils/request';
import { webhookService } from './service';

export const getWebhooks = functions.region('europe-west1').https.onRequest(
  handleRequest(async (req, res) => {
    const webhooks = await webhookService.getWebhooks();

    res.json(webhooks);
  }),
);

export const addWebhook = functions.region('europe-west1').https.onRequest(
  handleRequest(async (req, res) => {
    const {
      body: { url, schedule, name },
    } = req;

    if (!name || !url || !schedule) {
      throw new ApplicationError('Url, schedule and name are required.');
    }

    try {
      parseExpression(schedule);
    } catch (e) {
      throw new ApplicationError('Invalid schedule expression');
    }

    const webhook = await webhookService.createWebhook({ url, schedule, name });

    res.json(webhook);
  }),
);
