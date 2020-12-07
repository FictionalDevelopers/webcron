import * as admin from 'firebase-admin';

admin.initializeApp();

export {
  addWebhook,
  getWebhooks,
} from './components/webhooks/router';
export {
  getNextDateForSchedule,
} from './components/cron/router';
