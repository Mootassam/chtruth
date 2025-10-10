import { stackingQueue } from '../utils/stackingQueue';

/**
 * Schedule a stacking job to automatically finalize when the end date arrives.
 * @param record - The stacking record (includes startDate, plan info, etc.)
 * @param tenant - The tenant object
 */
export async function scheduleStackingJob(record, tenant) {
  // Ensure we have a valid start date
  const startDate = record.startDate ? new Date(record.startDate) : new Date();

  // If the plan contains duration (in days, hours, etc.), calculate endDate
  // Example: plan.duration = 7 (days)
  if (record.plan && record.plan.duration) {
    // Assuming the plan duration is in **days**
    record.endDate = new Date(startDate.getTime() + record.plan.duration * 24 * 60 * 60 * 1000);
  }

  // Otherwise, fallback to existing endDate (if already set)
  const now = new Date();
  const delayMs = Math.max(new Date(record.endDate).getTime() - now.getTime(), 0);

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

  console.log(`📅 Scheduled stacking job for ${record.id} to run in ${delayMs} ms`);
}
