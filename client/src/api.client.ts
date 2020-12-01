import ky from 'ky';
import { SERVER_URL } from './config';

export const api = ky.create({
  prefixUrl: `${SERVER_URL}/api`,
});

export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    return false;
  }

  return contentType.includes('application/json');
}

export async function handleError({ response }: { response: Response }) {
  if (isJsonResponse(response)) {
    return Promise.reject(await response.json());
  }

  const message = await response.text();

  return Promise.reject({
    message: message,
  });
}
