export type Webhook = {
  id: string;
  name: string;
  url: string;
  schedule: string;
  nextTime: number;
};

export type CreateWebhookPayload = Omit<Webhook, 'id'>;
