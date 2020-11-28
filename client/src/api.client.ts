import ky from 'ky';
import { SERVER_URL } from './config';

export const api = ky.create({
  prefixUrl: `${SERVER_URL}/api`,
});
