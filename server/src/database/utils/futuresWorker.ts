import 'dotenv/config'; // <-- make sure .env is loaded

import { Worker } from 'bullmq';
import redisConnection from '../redisConnection';
import { FUTURES_QUEUE_NAME } from '../utils/futuresQueue';
import { autoFinalizeFutureJob } from './autoFinalizeFutureJob';

// Worker: processes jobs from the queue
export const futuresWorker = new Worker(
  FUTURES_QUEUE_NAME,
  autoFinalizeFutureJob,
  {
    connection: redisConnection,
    concurrency: 10,
  }
);

futuresWorker.on('completed', (job) => {
});

futuresWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});


process.on('SIGTERM', async () => {
  await futuresWorker.close();
});
