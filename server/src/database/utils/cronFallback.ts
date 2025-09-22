// import cron from 'node-cron';
// import mongoose from 'mongoose';
// import Futures from '../models/futures';

// export function startCronFallback() {
//   cron.schedule('*/30 * * * * *', async () => {
//     console.log('[cronFallback] scanning...');

//     if (!mongoose.connection.readyState) {
//       await mongoose.connect(process.env.DATABASE_CONNECTION as string);
//     }

//     const FuturesModel = Futures(mongoose.connection);
//     const now = new Date();

//     const overdue = await FuturesModel.find({
//       finalized: false,
//       expiryTime: { $lte: now },
//     }).select('_id');

//     for (const f of overdue) {
//       try {
//         const res = await finalizeFutureAsLoss(mongoose.connection, f._id.toString());
//         console.log(`[cronFallback] future ${f._id} → ${res.ok ? 'ok' : res.reason}`);
//       } catch (err) {
//         console.error(`[cronFallback] error finalizing ${f._id}`, err);
//       }
//     }
//   });
// }
