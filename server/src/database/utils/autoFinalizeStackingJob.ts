import { databaseInit } from "../databaseConnection";
import Stacking from "../models/stacking";
import StackingPlan from "../models/stakeProgram";
import Wallet from "../models/wallet";
import Transaction from "../models/transaction";
import Notification from "../models/notification";
import User from "../models/user";

export async function autoFinalizeStackingJob(job) {
  if (!job?.data) {
    console.error("autoFinalizeStackingJob: No job data provided");
    return;
  }

  let mongoose;
  try {
    mongoose = await databaseInit();
    const { stackingId, tenantId } = job.data;

    if (!stackingId || !tenantId) {
      console.error("autoFinalizeStackingJob: missing stackingId or tenantId");
      return;
    }

    const stackingModel = Stacking(mongoose);
    const stackingRecord = await stackingModel
      .findOne({ _id: stackingId, tenant: tenantId })
      .populate("plan")
      .populate("user")
      .lean();

    if (!stackingRecord) {
      console.warn(`Stacking record ${stackingId} not found for tenant ${tenantId}`);
      return;
    }

    if (stackingRecord.status !== "active") {
      console.log(`Stacking ${stackingId} already processed with status: ${stackingRecord.status}`);
      return;
    }

    // Ensure plan data
    let plan = stackingRecord.plan;
    if (!plan || !plan.dailyRate || plan.unstakingPeriod === undefined) {
      const stackingPlanModel = StackingPlan(mongoose);
      plan = await stackingPlanModel.findById(stackingRecord.plan).lean();
      if (!plan) {
        console.error(`Plan ${stackingRecord.plan} not found for stacking ${stackingId}`);
        return;
      }
    }

    // Calculate rewards - FIXED CALCULATION
    const amount = Number(stackingRecord.amount);
    const dailyRatePercent = Number(plan.dailyRate || 0);
    const unstakingPeriod = Number(plan.unstakingPeriod || 0);
    
    // Calculate total rewards for the entire stacking period
    const earnedRewards = Number((amount * (dailyRatePercent / 100) * unstakingPeriod).toFixed(8));
    const totalToCredit = Number((amount + earnedRewards).toFixed(8));
    const currency = plan.currency || "USDT";

    const walletModel = Wallet(mongoose);
    const txModel = Transaction(mongoose);
    const notifModel = Notification(mongoose);
    const userModel = User(mongoose);

    // ✅ Update stacking record
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

    // ✅ Update user's wallet (principal + reward)
    const updatedWallet = await walletModel.findOneAndUpdate(
      { user: stackingRecord.user._id, symbol: currency, tenant: tenantId },
      { 
        $inc: { amount: totalToCredit },
        $set: { updatedBy: null, updatedAt: new Date() }
      },
      { new: true, upsert: true, runValidators: true }
    );

    // ✅ Create staking reward transaction
    await txModel.create({
      type: "staking_reward",
      referenceId: stackingRecord._id,
      wallet: updatedWallet._id,
      asset: currency,
      amount: totalToCredit,
      status: "completed",
      direction: "in",
      user: stackingRecord.user._id,
      tenant: tenantId,
      dateTransaction: new Date(),
      createdBy: null,
      updatedBy: null,
    });

    // ✅ Create staking reward notification
    await notifModel.create({
      userId: stackingRecord.user._id,
      type: "staking",
      message: `Your stacking of ${amount} ${currency} has been completed. You earned ${earnedRewards} ${currency}.`,
      tenant: tenantId,
      forAdmin: false,
      status: "unread", // Added missing status field
      createdBy: null, // Added missing createdBy field
      updatedBy: null, // Added missing updatedBy field
    });

    // ✅ FIRST STACKING REFERRAL BONUS
    const currentUser = await userModel.findById(stackingRecord.user._id);
    if (!currentUser) {
      console.warn(`User ${stackingRecord.user._id} not found for referral bonus`);
      return;
    }

    if (!currentUser.firstStackingDone) {
      const bonusLevels = [10, 7, 4]; // 3 levels
      let refSourceUser = currentUser;

      for (let level = 1; level <= 3; level++) {
        if (!refSourceUser.invitationcode) break;

        const refUser = await userModel.findOne({
          refcode: refSourceUser.invitationcode,
        });

        if (!refUser) break;

        const reward = Number((earnedRewards * bonusLevels[level - 1]) / 100);

        // Update referrer wallet
        const refWallet = await walletModel.findOneAndUpdate(
          { user: refUser._id, symbol: "USDT", tenant: tenantId },
          { $inc: { amount: reward } },
          { new: true, upsert: true, runValidators: true }
        );

        // Create bonus transaction
        await txModel.create({
          type: "referral_commission",
          referenceId: stackingRecord._id,
          wallet: refWallet._id,
          asset: "USDT",
          amount: reward,
          status: "completed",
          direction: "in",
          user: refUser._id,
          tenant: tenantId,
          dateTransaction: new Date(),
          createdBy: stackingRecord.user._id,
          updatedBy: null,
        });

        // Create notification for referrer
        await notifModel.create({
          userId: refUser._id,
          type: "commission",
          message: `You earned ${reward.toFixed(2)} USDT as level ${level} referral bonus from ${currentUser.email || "a user"}'s first stacking.`,
          tenant: tenantId,
          forAdmin: false,
          status: "unread",
          createdBy: stackingRecord.user._id,
          updatedBy: null,
        });

        refSourceUser = refUser;
      }

      // ✅ Mark user's first stacking as done
      await userModel.updateOne(
        { _id: currentUser._id },
        { 
          firstStackingDone: true,
          updatedBy: null 
        }
      );
    }

    console.log(`✅ Auto-finalized stacking ${stackingId}: Credited ${totalToCredit} ${currency}`);
    
  } catch (error) {
    console.error("Error in autoFinalizeStackingJob:", error);
    throw error; // Re-throw to let the job queue handle retries
  }
}