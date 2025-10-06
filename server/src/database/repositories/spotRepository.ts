import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Spot from "../models/spot";
import Transaction from "../models/transaction";
import Wallet from "../models/wallet";

class SpotRepository {
static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    console.log('data', data);

    try {
        // Get the trading pair and extract base/quote currencies
        const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');
        let targetWallet;
        let sourceWallet;
        
        if (data.direction === "BUY") {
            // BUY LOGIC: Convert quote currency to base currency
            
            // 1. Find or create the target wallet (base currency)
            targetWallet = await Wallet(options.database).findOne({
                user: currentUser.id,
                symbol: baseCurrency,
                tenant: currentTenant.id
            });

            if (!targetWallet) {
                // Create new wallet for the base currency
                [targetWallet] = await Wallet(options.database).create([{
                    user: currentUser.id,
                    symbol: baseCurrency,
                    coinName: baseCurrency,
                    amount: 0,
                    status: "available",
                    tenant: currentTenant.id,
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id
                }]);
            }

            // 2. Find the source wallet (quote currency - usually USDT)
            sourceWallet = await Wallet(options.database).findOne({
                user: currentUser.id,
                symbol: quoteCurrency,
                tenant: currentTenant.id
            });

            if (!sourceWallet) {
                throw new Error(`Wallet for ${quoteCurrency} not found. Please deposit ${quoteCurrency} first.`);
            }

            // 3. Check if source wallet has sufficient balance
            const requiredAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
            
            if (sourceWallet.amount < requiredAmount) {
                throw new Error(`Insufficient ${quoteCurrency} balance. Available: ${sourceWallet.amount}, Required: ${requiredAmount}`);
            }

            // 4. Execute the trade (only for MARKET orders immediately)
            if (data.delegateType === "MARKET") {
                // Deduct from source wallet (quote currency)
                sourceWallet.amount -= requiredAmount;
                await sourceWallet.save();

                // Add to target wallet (base currency)
                const receivedAmount = data.orderQuantity;
                targetWallet.amount += receivedAmount;
                await targetWallet.save();

                // Update order status to completed for market orders
                data.status = "completed";
                data.transactionQuantity = receivedAmount;
                data.transactionValue = requiredAmount;
                data.closingPrice = data.commissionPrice;
                data.closingTime = new Date();
            }

        } else if (data.direction === "SELL") {
            // SELL LOGIC: Convert base currency to quote currency
            
            // 1. Find the source wallet (base currency)
            sourceWallet = await Wallet(options.database).findOne({
                user: currentUser.id,
                symbol: baseCurrency,
                tenant: currentTenant.id
            });

            if (!sourceWallet) {
                throw new Error(`Wallet for ${baseCurrency} not found. Please deposit ${baseCurrency} first.`);
            }

            // 2. Check if source wallet has sufficient balance
            if (sourceWallet.amount < data.orderQuantity) {
                throw new Error(`Insufficient ${baseCurrency} balance. Available: ${sourceWallet.amount}, Required: ${data.orderQuantity}`);
            }

            // 3. Find or create target wallet (quote currency)
            targetWallet = await Wallet(options.database).findOne({
                user: currentUser.id,
                symbol: quoteCurrency,
                tenant: currentTenant.id
            });

            if (!targetWallet) {
                [targetWallet] = await Wallet(options.database).create([{
                    user: currentUser.id,
                    symbol: quoteCurrency,
                    coinName: quoteCurrency,
                    amount: 0,
                    status: "available",
                    tenant: currentTenant.id,
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id
                }]);
            }

            // 4. Execute the trade (only for MARKET orders immediately)
            if (data.delegateType === "MARKET") {
                // Deduct from source wallet (base currency)
                sourceWallet.amount -= data.orderQuantity;
                await sourceWallet.save();

                // Add to target wallet (quote currency)
                const receivedAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
                targetWallet.amount += receivedAmount;
                await targetWallet.save();

                // Update order status to completed for market orders
                data.status = "completed";
                data.transactionQuantity = data.orderQuantity;
                data.transactionValue = receivedAmount;
                data.closingPrice = data.commissionPrice;
                data.closingTime = new Date();
            }
        }

        // Create the spot order record
        const [record] = await Spot(options.database).create(
            [{
                ...data,
                userAccount: currentUser.id,
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
                commissionTime: new Date()
            }],
            options
        );

        // Create transaction records for completed trades
        if (data.delegateType === "MARKET") {
            const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');
            
            if (data.direction === "BUY") {
                // Create transaction for the BUY operation
                await Transaction(options.database).create([{
                    type: "convert_in",
                    wallet: targetWallet._id,
                    asset: baseCurrency,
                    relatedAsset: quoteCurrency,
                    amount: data.orderQuantity,
                    status: "completed",
                    direction: "in",
                    user: currentUser.id,
                    tenant: currentTenant.id,
                    dateTransaction: new Date(),
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id
                }], options);

            } else if (data.direction === "SELL") {
                // Create transaction for the SELL operation  
                await Transaction(options.database).create([{
                    type: "convert_out", 
                    wallet: sourceWallet._id,
                    asset: baseCurrency,
                    relatedAsset: quoteCurrency,
                    amount: data.orderQuantity,
                    status: "completed",
                    direction: "out",
                    user: currentUser.id,
                    tenant: currentTenant.id,
                    dateTransaction: new Date(),
                    createdBy: currentUser.id,
                    updatedBy: currentUser.id
                }], options);
            }
        }

        // Create audit log
        await this._createAuditLog(
            AuditLogRepository.CREATE,
            record.id,
            data,
            options
        );

        return this.findById(record.id, options);

    } catch (error) {
        throw error;
    }
}

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Spot(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Spot(options.database).updateOne(
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

  static async UpdateStatus(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    // Find and validate record
    let record = await Spot(options.database).findById(id);
    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    // Prepare update data
    const updateData = {
      ...data,
      updatedBy: MongooseRepository.getCurrentUser(options).id,
    };

    // Update record
    await Spot(options.database).updateOne(
      { _id: id },
      { status: data, updatedBy: updateData.updatedBy },
      options
    );

    // Create audit log
    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    // Return updated record
    return await this.findById(id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Spot(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Spot(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Spot(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Spot(options.database)
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
    let rows = await Spot(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Spot(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    criteriaAnd.push({
      userAccount: currentUser.id,
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
    let rows = await Spot(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Spot(options.database).countDocuments(criteria);

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

    const records = await Spot(options.database)
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
        entityName: Spot(options.database).modelName,
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

export default SpotRepository;
