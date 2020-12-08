export type WebhookHistoryEntry = {
  webhookId: string;
  time: number;
  statusCode: number;
  body: string;
  url: string;
  errorMessage?: string,
};
