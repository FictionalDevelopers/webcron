import * as createCorsMiddleware from 'cors';
import { Request, Response } from 'firebase-functions';
import { ApplicationError } from '../errors/ApplicationError';

const cors = createCorsMiddleware({
  origin: true,
});

type Handler = (req: Request, res: Response) => void | Promise<void>;

export function handleRequest(handler: Handler) {
  return (req: Request, res: Response) => {
    cors(req, res, async () => {
      try {
        await handler(req, res);
      } catch (err) {
        const status = err instanceof ApplicationError ? 400 : 500;

        res.status(status).json({
          message: err.message,
        });
      }
    });
  };
}
