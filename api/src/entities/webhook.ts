export type Webhook = {
  id: string;
  url: string;
  schedule: string;
};

export type CreateWebhookPayload = Omit<Webhook, 'id'>;
