import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Deposit from "../models/deposit";
import assets from "../models/wallet";
import transaction from "../models/transaction";
import wallet from "../models/wallet";

class DepositRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await Deposit(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    const WalletModel = assets(options.database);
    const TransactionModel = options.database.model("transaction");

    // 1️⃣ Fetch the user's wallet for the given asset
    let wallet = await WalletModel.findOne({
      user: currentUser.id,
      symbol: data.rechargechannel.toUpperCase(),
    });



    // 3️⃣ Create a transaction log
    await TransactionModel.create({
      type: "deposit",
      wallet: wallet.id,
      asset: wallet.symbol,
      amount: data.amount,
      referenceId:record.id,
      direction: "in",
      status: "pending", // deposit is pending
      user: currentUser.id,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
    });

    // 4️⃣ Return the updated wallet
    return wallet;
  }

  static async update(id, data, io, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).updateOne(
      { _id: id },
      {
        ...data,
        auditor: MongooseRepository.getCurrentUser(options).id,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

static async updateStatus(id, data, io, options: IRepositoryOptions) {
  const currentUser = MongooseRepository.getCurrentUser(options);

  // ✅ Update the deposit status
  await Deposit(options.database).updateOne(
    { _id: id },
    {
      $set: {
        status: data.status,
        acceptime: new Date(), // store current time
        auditor: currentUser.id,
        updatedBy: currentUser.id,
      },
    },
    options
  );

  // ✅ Update the related transaction using referenceId + referenceModel
  await transaction(options.database).updateOne(
    {
      referenceId: id,

    },
    {
      $set: {
        status: data.status,
        updatedBy: currentUser.id,
      },
    },
    options
  );
}


  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database)
        .findById(id)
        .populate("auditor")
        .populate("createdBy"),
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
    let rows = await Deposit(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("auditor")
      .populate("createdBy");

    const count = await Deposit(options.database).countDocuments(criteria);

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

    const records = await Deposit(options.database)
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
        entityName: Deposit(options.database).modelName,
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

export default DepositRepository;
