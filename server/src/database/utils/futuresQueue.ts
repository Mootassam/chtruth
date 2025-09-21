// src/utils/futuresQueue.ts
import { Queue } from 'bullmq';
import redisConnection from '../redisConnection';

export const FUTURES_QUEUE_NAME = 'futures';

// This Queue is used by the app to schedule jobs
export const futuresQueue = new Queue(FUTURES_QUEUE_NAME, {
  connection: redisConnection,
});
