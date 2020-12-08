import { api, handleError } from '../api.client';
import type { CreateWebhookPayload } from '../entities/webhook';

export async function getNextExpectedDate(hook: CreateWebhookPayload) {
  return api.get(
    'routes-getNextDateForSchedule',
    { searchParams: { schedule: hook.schedule } },
  ).json().catch(handleError);
}

