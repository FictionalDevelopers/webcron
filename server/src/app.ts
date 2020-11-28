import { CLIENT_URL } from '@webcron/config/dist/env';
import * as express from 'express';
import * as cors from 'cors';

import { router as webhooksRouter } from './components/webhooks';

interface Options {
  port: number;
}
export async function run({ port }: Options) {
  const app = express();

  app.use(cors({ origin: CLIENT_URL }));
  app.use(express.json());

  app.use('/api/webhooks', webhooksRouter);

  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
}
