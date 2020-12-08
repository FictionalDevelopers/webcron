import * as admin from 'firebase-admin';
import { addWebhook, getWebhooks, } from './components/webhooks/router';
import { getNextDateForSchedule, } from './components/cron/router';
import { fireHooks, schedule } from './components/cron/schedule';

admin.initializeApp();

export const routes = {
  addWebhook,
  getWebhooks,
  getNextDateForSchedule,
};

export const cron = { schedule, fireHooks };
