import { Repository as WebhookRepository } from './components/webhooks';
import { createFirestoreWebhookRepository } from './implementations/firestore-webhook.repository';

export const webhookRepository: WebhookRepository = createFirestoreWebhookRepository();
