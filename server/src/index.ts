import 'module-alias/register';
import { SERVER_PORT } from '@webcron/config/env';
import { run } from './app';

run({ port: SERVER_PORT });
