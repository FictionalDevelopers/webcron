import { env } from '@webcron/config';
import { run } from './app';

run({ port: env.SERVER_PORT });
