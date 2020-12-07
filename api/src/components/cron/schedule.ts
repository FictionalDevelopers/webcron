import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { format } from 'date-fns';

export const schedule = functions
  .region('europe-west1')
  .pubsub
  .schedule('* * * * *')
  .onRun(async () => {
    await admin
      .firestore()
      .collection('schedule-log')
      .add({ date: format(new Date(), 'do MMM yyyy HH:mm') });
  });
