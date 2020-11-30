import { CLIENT_URL } from '@webcron/config/env';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router as webhooksRouter } from './components/webhooks';
import { ApplicationError } from './errors/ApplicationError';

interface Options {
  port: number;
}
export async function run({ port }: Options) {
  const app = express();

  app.use(cors({ origin: CLIENT_URL }));
  app.use(express.json());

  app.use('/api/webhooks', webhooksRouter);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof ApplicationError ? 400 : 500;

  res.status(status).json({
    message: err.message,
  });
}
