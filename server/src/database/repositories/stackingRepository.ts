import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Stacking from "../models/stacking";
import StackingPlan from "../models/stackingPlan"; // Import the StackingPlan model
import assets from "../models/wallet";
import Error405 from "../../errors/Error405";
class StackingRepository {


static async create(data, options: IRepositoryOptions) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);
  
  // Fetch the stacking plan
  const plan = await StackingPlan(options.database).findById(data.plan);
  if (!plan) {
    throw new Error404();
  }

  // Validation: Check if amount is within plan limits
  if (data.amount < plan.minimumStake) {
    throw new Error(`Amount must be at least ${plan.minimumStake} ${plan.currency}`);
  }
  
  if (data.amount > plan.maxStake) {
    throw new Error(`Amount cannot exceed ${plan.maxStake} ${plan.currency}`);
  }

  // Validation: Check user's wallet balance
  const WalletModel = assets(options.database);
  const wallet = await WalletModel.findOne({
    user: currentUser.id,
    symbol: plan.currency,
  });

  if (!wallet) {
    throw new Error405(`Wallet not found for ${plan.currency}`);
  }

  if (wallet.amount < data.amount) {
    throw new Error405(`Insufficient balance. You have ${wallet.amount} ${plan.currency} but trying to stake ${data.amount} ${plan.currency}`);
  }

  // Validation: Check if user already has an active stake for this plan
  const existingStake = await Stacking(options.database).findOne({
    user: currentUser.id,
    plan: data.plan,
    status: "active"
  });

 

  // Validation: Check if the plan is still available
  const currentDate = new Date();
  if (plan.startDate && currentDate < plan.startDate) {
    throw new Error405("This staking plan is not yet available");
  }

  if (plan.endDate && currentDate > plan.endDate) {
    throw new Error405("This staking plan has expired");
  }

  // Calculate end date
  const endDate = new Date(data.startDate);
  endDate.setDate(endDate.getDate() + plan.unstakingPeriod);
  
  // Create the stake record
  const [record] = await Stacking(options.database).create(
    [
      {
        ...data,
        endDate,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      },
    ],
    options
  );
  
  const item = await this.findById(record.id, options);
  
  const TransactionModel = options.database.model("transaction");

  // Deduct the staked amount from the wallet
  await WalletModel.updateOne(
    { _id: wallet.id },
    {
      $inc: { amount: -data.amount },
      updatedBy: currentUser.id,
    },
    options
  );

  // Create a transaction log
  await TransactionModel.create({
    type: "stacking",
    wallet: wallet.id,
    asset: wallet.symbol,
    amount: data.amount,
    referenceId: record.id,
    direction: "out",
    status: "completed",
    user: currentUser.id,
    tenant: currentTenant.id,
    createdBy: currentUser.id,
    updatedBy: currentUser.id,
  });

  return record;
}

  static async update(id, data, io, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Stacking(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Stacking(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Stacking(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Stacking(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Stacking(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Stacking(options.database)
        .findById(id)
        .populate("plan"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    // Process rewards and status on-demand when fetching a stacking
    record = await this._processStacking(record, options);

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 50, offset = 0, orderBy = "" },
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

      if (filter.plan) {
        criteriaAnd.push({
          plan: filter.plan,
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: filter.status,
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

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_ASC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
    let rows = await Stacking(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("plan")
    

    const count = await Stacking(options.database).countDocuments(criteria);

    // Process rewards and status for all rows
    rows = await Promise.all(rows.map(row => this._processStacking(row, options)));
    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));


    return { rows, count };
  }


  // Process stacking rewards and status
  static async _processStacking(record, options: IRepositoryOptions) {
    // Only process active stackings
    if (record.status !== 'active') {
      return record;
    }

    const now = new Date();
    const endDate = new Date(record.endDate);
    
    // Check if stacking has completed
    if (now >= endDate) {
      // Update status to completed
      await Stacking(options.database).updateOne(
        { _id: record._id },
        {
          status: 'completed',
          updatedBy: MongooseRepository.getCurrentUser(options).id,
        },
        options
      );
      
      // Update the record object
      record.status = 'completed';
      
      // Create audit log
      await this._createAuditLog(
        AuditLogRepository.UPDATE,
        record._id,
        { status: 'completed' },
        options
      );
      
      return record;
    }
    
    // Calculate rewards for active stacking
    const startDate = new Date(record.startDate);
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
    
    // Calculate rewards based on daily rate and elapsed days
    const dailyRate = record.plan.dailyRate;
    const earnedRewards = record.amount * (dailyRate / 100) * daysElapsed;
    // Update if rewards have changed
    if (earnedRewards !== record.earnedRewards) {
      await Stacking(options.database).updateOne(
        { _id: record._id },
        {
          earnedRewards,
          updatedBy: MongooseRepository.getCurrentUser(options).id,
        },
        options
      );
      

      // Update the record object
      record.earnedRewards = earnedRewards;
      
      // Create audit log
      await this._createAuditLog(
        AuditLogRepository.UPDATE,
        record._id,
        { earnedRewards },
        options
      );
    }
    
    return record;
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

    const records = await Stacking(options.database)
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
        entityName: Stacking(options.database).modelName,
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

export default StackingRepository;