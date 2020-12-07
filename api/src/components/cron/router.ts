import { parseExpression } from 'cron-parser';
import { ApplicationError } from '../../errors/ApplicationError';
import * as functions from 'firebase-functions';
import { handleRequest } from '../../utils/request';

export const getNextDateForSchedule = functions.region('europe-west1').https.onRequest(
  handleRequest(async (req, res) => {
    const {
      query: { schedule: scheduleParam }
    } = req;

    if (!scheduleParam) {
      throw new ApplicationError('Schedule is required');
    }

    const schedule = typeof scheduleParam === 'string' ? scheduleParam : scheduleParam.toString();

    try {
      const cron = parseExpression(schedule);

      res.json({
        next: cron.next().getTime(),
      });
    } catch (e) {
      throw new ApplicationError('Schedule is invalid');
    }
  }),
)

