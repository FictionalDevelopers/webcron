import * as admin from 'firebase-admin';
import { addWebhook, getWebhooks, } from './components/webhooks/router';
import { getNextDateForSchedule, } from './components/cron/router';
import { fireWebhook, schedule } from './components/cron/schedule';
import * as functions from 'firebase-functions';
import { handleRequest } from './utils/request';

admin.initializeApp();

export const routes = {
  addWebhook,
  getWebhooks,
  getNextDateForSchedule,
};

export const cron = { schedule, fireWebhook };

export const testFunction = functions.region('europe-west1').https.onRequest(
  handleRequest(async (req, res) => {
    const { query } = req;

    res.json(query);
  }),
);
