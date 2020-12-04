import * as admin from 'firebase-admin';
import { Repository as WebhookRepository } from '../components/webhooks';
import { CreateWebhookPayload, Webhook } from '../entities/webhook';

export function createFirestoreWebhookRepository(): WebhookRepository {
  async function createWebhook(hook: CreateWebhookPayload): Promise<Webhook> {
    const writeResult = await admin
      .firestore()
      .collection('webhooks')
      .add(hook);

    return { id: writeResult.id, ...hook };
  }
  async function getAllWebhooks(): Promise<Webhook[]> {
    const snapshot = await admin.firestore().collection('webhooks').get();

    return snapshot.docs.map<Webhook>(
      (doc) => ({ id: doc.id, ...doc.data() } as Webhook),
    );
  }

  return {
    createWebhook,
    getAllWebhooks,
  };
}
