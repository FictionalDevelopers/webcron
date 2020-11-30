import { CLIENT_URL } from '@webcron/config/env';
import cors from 'cors';
import express from 'express';
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
