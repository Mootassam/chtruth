import { databaseInit } from "../databaseConnection";
import Futures from "../models/futures";
import transaction from "../models/transaction";
import wallet from "../models/wallet";

// New, simplified job handler for auto-finalization
export async function autoFinalizeFutureJob(job) {
    const mongoose = await databaseInit();

  const { futureId, tenantId } = job.data;

  // 1. Fetch the contract record and user data
  const futureRecord = await Futures(mongoose).findOne({ _id: futureId, tenant: tenantId }).populate('createdBy');
  
  // 2. Critical Check: If it's already finalized, do nothing.
  if (!futureRecord || futureRecord.finalized) {
    return;
  }

  const walletModel = wallet(mongoose);
  const transactionModel = transaction(mongoose);

  // 3. Find the user's wallet
  const selectedWallet = await walletModel.findOne({
    user: futureRecord.createdBy._id || futureRecord.createdBy,
    symbol: "USDT",
    tenant: tenantId,
  });

  if (!selectedWallet) {
    console.error(`Wallet not found for user. Skipping auto-finalize for contract ${futureId}`);
    return;
  }

  // 4. Determine the amount to deduct (the full initial stake)
  const amountToDebit = Number(futureRecord.futuresAmount || 0);

  // 5. Perform the debit operation on the wallet
  const updatedWallet = await walletModel.findOneAndUpdate(
    {
      _id: selectedWallet._id,
      tenant: tenantId,
      amount: { $gte: amountToDebit }, // Ensure sufficient funds
    },
    {
      $inc: { amount: -amountToDebit }, // Deduct the full amount
    },
    { new: true }
  );

  if (!updatedWallet) {
    console.error(`Insufficient funds. Skipping auto-finalize for contract ${futureId}`);
    return;
  }

  // 6. Record the transaction for history/auditing
  await transactionModel.create({
    type: 'futures_loss',
    referenceId: futureRecord._id,
    wallet: selectedWallet._id,
    asset: "USDT",
    amount: amountToDebit,
    status: "completed",
    direction: "out",
    user: futureRecord.createdBy._id || futureRecord.createdBy,
    tenant: tenantId,
    dateTransaction: new Date()
  });

  // 7. FINALIZE THE RECORD - Only update the necessary fields
  await Futures(mongoose).updateOne(
    { _id: futureId },
    {
      $set: {
        finalized: true,       // ✅ Mark as finalized
        finalizedAt: new Date(), // ✅ Set the finalization time
        control: 'loss'   ,
       profitAndLossAmount : amountToDebit    // ✅ Set the outcome to 'loss'
        // ❌ DO NOT set closePositionTime or closePositionPrice
      }
    }
  );

  // 8. (Optional) Notify the user's UI in real-time
  // io.to(userId).emit('futureClosed', { futureId, outcome: 'loss', amountLost: amountToDebit });
}