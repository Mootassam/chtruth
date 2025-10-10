// src/jobs/autoFinalizeStackingJob.ts
import { databaseInit } from "../databaseConnection";
import Stacking from "../models/stacking";
import StackingPlan from "../models/stakeProgram";
import wallet from "../models/wallet";
import transaction from "../models/transaction";
import { sendNotification } from "../../services/notificationServices";
import { IRepositoryOptions } from "../repositories/IRepositoryOptions";
import NotificationRepository from "../repositories/notificationtRepository";
import notification from "../models/notification";

export async function autoFinalizeStackingJob(job) {
  if (!job?.data) return;

  const mongoose = await databaseInit();
  const { stackingId, tenantId } = job.data;

  if (!stackingId) {
    console.error("autoFinalizeStackingJob: missing stackingId");
    return;
  }

  const stackingModel = Stacking(mongoose);
  let stackingRecord = await stackingModel
    .findOne({ _id: stackingId, tenant: tenantId })
    .populate("plan")
    .populate("user")
    .lean();

  if (!stackingRecord) {
    console.warn(`Stacking record ${stackingId} not found`);
    return;
  }

  if (stackingRecord.status !== "active") {
    console.log(`Stacking ${stackingId} already processed`);
    return;
  }

  // ensure plan data
  let plan = stackingRecord.plan;
  if (!plan || !plan.dailyRate || !plan.unstakingPeriod) {
    const stackingPlanModel = StackingPlan(mongoose);
    plan = await stackingPlanModel.findById(stackingRecord.plan).lean();
    if (!plan) return;
  }

  // days elapsed: for testing force at least 1 day
  const startDate = new Date(stackingRecord.startDate);
  const endDate = new Date(stackingRecord.endDate);
  let daysElapsed = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  daysElapsed = Math.max(daysElapsed, 1); // force 1 day for short tests

  const amount = Number(stackingRecord.amount);
  const dailyRatePercent = Number(plan.dailyRate || 0);
  const earnedRewards = Number((amount * (dailyRatePercent / 100) * plan.unstakingPeriod));

  
  // update stacking record
  await stackingModel.updateOne(
    { _id: stackingId, tenant: tenantId },
    {
      $set: {
        status: "completed",
        earnedRewards,
        completedAt: new Date(),
        updatedBy: null,
      },
    }
  );

  // update user's wallet (principal + rewards)
  const walletModel = wallet(mongoose);
  const transactionModel = transaction(mongoose);
  const currency = plan.currency || "USDT";
  const totalToCredit = Number((amount + earnedRewards).toFixed(8));

  const updatedWallet = await walletModel.findOneAndUpdate(
    { user: stackingRecord.user._id || stackingRecord.user, symbol: currency, tenant: tenantId },
    { $inc: { amount: totalToCredit }, $set: { updatedBy: null } },
    { new: true, upsert: true }
  );

  if (!updatedWallet) {
    console.error(`Failed to update wallet for stacking ${stackingId}`);
    return;
  }

  // create transaction log
  await transactionModel.create({
    type: "staking_reward",
    referenceId: stackingId,
    wallet: updatedWallet._id,
    asset: currency,
    amount: totalToCredit,
    status: "completed",
    direction: "in",
    user: stackingRecord.user._id || stackingRecord.user,
    tenant: tenantId,
    dateTransaction: new Date(),
    createdBy: null,
    updatedBy: null,
  });


  // Create proper IRepositoryOptions object
  const options: IRepositoryOptions = {
    database: mongoose,
    currentUser: null, // or you can pass the system user
    currentTenant: { id: tenantId },
    session: null, // optional: if you're using transactions
    language: 'en', // optional: default language
  };

  // Corrected function call - remove the colon and type annotation
//  await sendNotification({
//       userId: stackingRecord.user._id ,
//       message: `${totalToCredit}`,
//       type: "staking",
//       options,
//     });
    

  console.log(`✅ Auto-finalized stacking ${stackingId} - credited ${totalToCredit} ${earnedRewards}`);
}
