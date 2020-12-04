import ky from 'ky';
import { API_URL } from './config';

export const api = ky.create({
  prefixUrl: API_URL,
});

export function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    return false;
  }

  return contentType.includes('application/json');
}

export async function handleError({ response }: { response?: Response }) {
  if (!response) {
    return Promise.reject({
      message: 'Something went wrong.',
    });
  }

  if (isJsonResponse(response)) {
    return Promise.reject(await response.json());
  }

  const message = await response.text();

  return Promise.reject({
    message: message,
  });
}
