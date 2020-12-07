export type Webhook = {
  id: string;
  name: string;
  url: string;
  schedule: string;
};

export type CreateWebhookPayload = Omit<Webhook, 'id'>;
