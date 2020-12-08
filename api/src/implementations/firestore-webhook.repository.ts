import * as admin from 'firebase-admin';
import { Repository as WebhookRepository } from '../components/webhooks';
import { CreateWebhookPayload, Webhook } from '../entities/webhook';
import { parseExpression } from 'cron-parser';
import { WebhookHistoryEntry } from '../entities/webhook-history';

export function createFirestoreWebhookRepository(): WebhookRepository {
  async function createWebhook(hook: CreateWebhookPayload): Promise<Webhook> {
    const cron = parseExpression(hook.schedule);

    const entry = {
      ...hook,
      nextTime: cron.next().getTime(),
    };

    const writeResult = await admin
      .firestore()
      .collection('webhooks')
      .add(entry);

    return { id: writeResult.id, ...entry };
  }

  async function getAllWebhooks(): Promise<Webhook[]> {
    const snapshot = await admin.firestore().collection('webhooks').get();

    return snapshot.docs.map<Webhook>(
      (doc) => ({ id: doc.id, ...doc.data() } as Webhook),
    );
  }

  async function getHistory(id: string): Promise<WebhookHistoryEntry[]> {
    const snapshot = await admin
      .firestore()
      .collection('webhooks-history')
      .doc(id)
      .collection('calls')
      .get();

    return snapshot.docs.map<WebhookHistoryEntry>(
      (doc) => {
        const historyEntry = doc.data() as WebhookHistoryEntry;

        return { id: doc.id, ...historyEntry };
      },
    );
  }

  return {
    createWebhook,
    getAllWebhooks,
    getHistory,
  };
}
