import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import depositMethod from "../models/depositMethod";
import Error405 from "../../errors/Error405";

class depositMethodRepository {
static async create(options: IRepositoryOptions) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);

  // Predefined deposit methods
  const defaultMethods = [
    { symbol: 'BTC', name: 'Bitcoin', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { symbol: 'USDT', name: 'Tether', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112' },
    { symbol: 'XRP', name: 'Ripple', address: 'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY' },
  ];

  try {
    // Check if any deposit method already exists for this tenant
    const existing = await depositMethod(options.database).countDocuments({ 
      tenant: currentTenant.id 
    });
    
    if (existing > 0) {
      throw new Error405('Deposit methods already initialized');
    }

    const recordsToCreate = defaultMethods.map(data => ({
      ...data,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Create all records in a single operation
    const createdRecords = await depositMethod(options.database).create(
      recordsToCreate,
      options
    );

    return createdRecords;
    
  } catch (error:any) {
    // Handle specific MongoDB duplicate key errors
    if (error.code === 11000) {
      throw new Error405('Deposit methods already exist for this tenant');
    }
    
    // Re-throw other errors
    throw error;
  }
}

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      depositMethod(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await depositMethod(options.database).updateOne(
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
      depositMethod(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await depositMethod(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      depositMethod(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      depositMethod(options.database)
        .findById(id)
        .populate("user")
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
    let rows = await depositMethod(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")

    const count = await depositMethod(options.database).countDocuments(criteria);

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

    const records = await depositMethod(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.currency,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    // await AuditLogRepository.log(
    //   {
    //     entityName: depositMethod(options.database).modelName,
    //     entityId: id,
    //     action,
    //     values: data,
    //   },
    //   options
    // );
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

export default depositMethodRepository;
