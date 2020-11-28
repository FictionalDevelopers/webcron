import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(__dirname, '../', '.env'),
});

export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 5002;
export const SERVER_URL: string = process.env.SERVER_URL;
export const CLIENT_URL: string = process.env.CLIENT_URL;
