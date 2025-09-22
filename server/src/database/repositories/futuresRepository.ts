import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Futures from "../models/futures";
import User from "../models/user";
import Wallet from "../models/wallet";
import transaction from "../models/transaction";
import cron from "node-cron";
// 1. CORRECT THE IMPORT: Import the Queue, not the Worker
import { futuresQueue } from '../utils/futuresQueue'; // ✅ Import the QUEUE

class FuturesRepository {

// inside FuturesRepository class:

static async create(data, options: IRepositoryOptions) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);

  const openPositionTime = data.openPositionTime
    ? new Date(data.openPositionTime)
    : new Date();

  const durationMs = await this.parseDurationToMs(
    data.contractDuration || '60s'
  );
  const expiryTime = new Date(openPositionTime.getTime() + durationMs);

  const payload = {
    ...data,
    openPositionTime,
    expiryTime,
    finalized: false,
    finalizedAt: null,
    tenant: currentTenant.id,
    createdBy: currentUser.id,
    updatedBy: currentUser.id,
  };

  const [record] = await Futures(options.database).create([payload], options);

  // === NEW JOB SCHEDULE ===
  try {
    await futuresQueue.add(
      `auto-finalize-${record.id}`,
      {
        futureId: record.id,
        tenantId: currentTenant.id,
      },
      {
        delay: durationMs,
        jobId: `auto-finalize-${record.id}`, // prevents duplicate jobs
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      }
    );

    console.log(
      `📅 Scheduled auto-finalize job for future ${record.id} at ${expiryTime}`
    );
  } catch (error) {
    console.error('Failed to schedule auto-finalize job:', error);
  }

  await this._createAuditLog(
    AuditLogRepository.CREATE,
    record.id,
    payload,
    options
  );

  return this.findById(record.id, options);
}

static async update(id, data, options /*: IRepositoryOptions */) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);

  const FuturesModel = Futures(options.database);
  const walletModel = Wallet(options.database);
  const transactionModel = transaction(options.database);

  // load record
  let record = await FuturesModel.findById(id);

  if (!record || String(record.tenant) !== String(currentTenant.id)) {
    throw new Error404();
  }

  if (record.finalized) {
    throw new Error('This futures entry is already finalized and cannot be changed.');
  }

  if (record.expiryTime && new Date() >= new Date(record.expiryTime)) {
    throw new Error('Contract duration already expired; entry will be/has been auto-finalized.');
  }

  const isControlUpdate = data.control === 'loss' || data.control === 'profit';

  try {
    if (isControlUpdate) {
      const selectedWallet = await walletModel.findOne({
        user: record.createdBy,
        symbol: "USDT",
        tenant: currentTenant.id,
      });

      if (!selectedWallet) {
        throw new Error(`USDT wallet not found for user ${record.createdBy}`);
      }

      const amountForProfit = Number(record.profitAndLossAmount || 0);
      const amountForLoss = Number(record.futuresAmount || 0);

      if (data.control === 'profit') {
        if (!(amountForProfit > 0)) {
          throw new Error('Profit amount is zero or invalid.');
        }

        await walletModel.findOneAndUpdate(
          { _id: selectedWallet._id, tenant: currentTenant.id },
          {
            $inc: { amount: amountForProfit },
            $set: { updatedBy: currentUser.id, updatedAt: new Date() },
          },
          { new: true }
        );
      } else {
        const debit = amountForLoss;

        if (!(debit > 0)) {
          throw new Error('Loss amount is zero or invalid.');
        }

        const updatedWallet = await walletModel.findOneAndUpdate(
          {
            _id: selectedWallet._id,
            tenant: currentTenant.id,
            amount: { $gte: debit },
          },
          {
            $inc: { amount: -debit },
            $set: { updatedBy: currentUser.id, updatedAt: new Date() },
          },
          { new: true }
        );

        if (!updatedWallet) {
          throw new Error('Insufficient funds in wallet');
        }
      }

      const transactionType = data.control === 'profit' ? 'futures_profit' : 'futures_loss';
      const transactionDirection = data.control === 'profit' ? 'in' : 'out';
      const txnAmount = data.control === 'profit' ? Math.abs(amountForProfit) : Math.abs(amountForLoss);

      await transactionModel.create({
        type: transactionType,
        referenceId: record._id,
        wallet: selectedWallet._id,
        asset: "USDT",
        amount: txnAmount,
        status: "completed",
        direction: transactionDirection,
        user: record.createdBy,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        dateTransaction: new Date()
      });

      await FuturesModel.updateOne(
        { _id: id, tenant: currentTenant.id, finalized: { $ne: true } },
        {
          $set: {
            control: data.control,
            finalized: true,
            finalizedAt: new Date(),
            updatedBy: currentUser.id,
          }
        }
      );

    } else {
      await FuturesModel.updateOne(
        { _id: id, tenant: currentTenant.id },
        { ...data, updatedBy: currentUser.id }
      );
    }

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);
    return record;

  } catch (err) {
    throw err;
  }
}




static async parseDurationToMs(duration: string | number | undefined) {
  if (duration == null) return 0;
  if (typeof duration === 'number') return duration * 1000; // assume seconds
  if (typeof duration !== 'string') return 0;

  const trimmed = duration.trim().toLowerCase();

  if (/^\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10) * 1000;
  }

  const m = trimmed.match(/^(\d+)(s|m|h|d)?$/);
  if (!m) return 0;

  const v = Number(m[1]);
  const unit = m[2] || 's';

  switch (unit) {
    case 's': return v * 1000;
    case 'm': return v * 60 * 1000;
    case 'h': return v * 60 * 60 * 1000;
    case 'd': return v * 24 * 60 * 60 * 1000;
    default: return v * 1000;
  }
}




  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Futures(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).findById(id).populate("user").populate("createdBy"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

       if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }

      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy")
 

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            titre: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Futures(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Futures(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options
    );
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;

    output.photo = await FileRepository.fillDownloadUrl(output.photo);

    return output;
  }
}

export default FuturesRepository;
