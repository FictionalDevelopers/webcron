import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PubSub } from '@google-cloud/pubsub';
import { parseExpression } from 'cron-parser';

const client = new PubSub();

const FIRE_HOOK = 'FIRE_HOOK';

export const schedule = functions
  .region('europe-west1')
  .pubsub
  .schedule('* * * * *')
  .onRun(async () => {
    const now = new Date().setSeconds(0, 0);

    const snapshot = await admin.firestore()
      .collection('webhooks')
      .where('nextTime', '==', now)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents.', now);
      return;
    }

    return Promise.all(
      snapshot.docs.map((doc) => {
        const data = doc.data();

        return client.topic(FIRE_HOOK).publish(
          Buffer.from(JSON.stringify({
            id: doc.id,
            schedule: data.schedule,
            url: data.url,
          })),
        );
      }),
    );
  });

export const fireHooks = functions
  .region('europe-west1')
  .pubsub
  .topic(FIRE_HOOK)
  .onPublish(async (message) => {
    const { id, schedule, url } = message.json;
    const cron = parseExpression(schedule);
    const nextTime = cron.next().getTime();

    await admin
      .firestore()
      .collection('webhooks-requests')
      .add({
        webhookId: id,
        time: Date.now(),
        url,
      });

    await admin.firestore()
      .collection('webhooks')
      .doc(id)
      .set({ nextTime }, { merge: true })
  });
