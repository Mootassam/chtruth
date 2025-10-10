// src/jobs/scheduleStackingJob.ts
import { stackingQueue } from '../utils/stackingQueue';

export async function scheduleStackingJob(record, tenant) {
  // TEST MODE: override endDate to 5 seconds from now
  record.endDate = new Date(Date.now() + 5000);

  const now = new Date();
  const delayMs = Math.max(record.endDate.getTime() - now.getTime(), 0);

  await stackingQueue.add(
    `auto-finalize-${record.id}`,
    { stackingId: record.id, tenantId: tenant.id },
    {
      delay: delayMs,
      jobId: `auto-finalize-${record.id}`,
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    }
  );

  console.log(`📅 Scheduled stacking job for ${record.id} in ${delayMs}ms`);
}
