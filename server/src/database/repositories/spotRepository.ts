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

    try {
      // Get the trading pair and extract base/quote currencies
      const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');
      let targetWallet;
      let sourceWallet;

      const WalletModel = Wallet(options.database);

      if (data.direction === "BUY") {
        // BUY: spend quote currency (e.g. USDT), receive base currency (e.g. BTC)

        // 1. Source wallet (quote currency) — must exist
        sourceWallet = await WalletModel.findOne({
          user: currentUser.id,
          symbol: quoteCurrency,
          tenant: currentTenant.id,
        });
        if (!sourceWallet) {
          throw new Error(`Wallet for ${quoteCurrency} not found. Please deposit ${quoteCurrency} first.`);
        }

        // 2. Check balance
        const requiredAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
        if (sourceWallet.amount < requiredAmount) {
          throw new Error(`Insufficient ${quoteCurrency} balance. Available: ${sourceWallet.amount}, Required: ${requiredAmount}`);
        }

        // 3. Target wallet (base currency) — create if missing (upsert, atomic)
        targetWallet = await WalletModel.findOneAndUpdate(
          { user: currentUser.id, symbol: baseCurrency, tenant: currentTenant.id },
          {
            $setOnInsert: {
              coinName: baseCurrency,
              amount: 0,
              status: "available",
              tenant: currentTenant.id,
              createdBy: currentUser.id,
              updatedBy: currentUser.id,
            },
          },
          { upsert: true, new: true }
        );

        // 4. Execute trade — use $inc to avoid loading+saving the full doc
        //    (loading an old doc with status:'active' and calling .save() would
        //     fail Mongoose enum validation even though we're only changing amount)
        if (data.delegateType === "MARKET") {
          await WalletModel.findOneAndUpdate(
            { _id: sourceWallet._id },
            { $inc: { amount: -requiredAmount }, $set: { updatedBy: currentUser.id } }
          );
          const receivedAmount = data.orderQuantity;
          await WalletModel.findOneAndUpdate(
            { _id: targetWallet._id },
            { $inc: { amount: receivedAmount }, $set: { updatedBy: currentUser.id } }
          );
          data.status = "completed";
          data.transactionQuantity = receivedAmount;
          data.transactionValue = requiredAmount;
          data.closingPrice = data.commissionPrice;
          data.closingTime = new Date();

        } else if (data.delegateType === "LIMIT") {
          await WalletModel.findOneAndUpdate(
            { _id: sourceWallet._id },
            { $inc: { amount: -requiredAmount }, $set: { updatedBy: currentUser.id } }
          );
          await Transaction(options.database).create([{
            type: "order_reserved",
            wallet: sourceWallet._id,
            asset: quoteCurrency,
            amount: requiredAmount,
            status: "completed",
            direction: "out",
            user: currentUser.id,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: null,
          }], options);
          data.status = "pending";
        }

      } else if (data.direction === "SELL") {
        // SELL: spend base currency (e.g. BTC), receive quote currency (e.g. USDT)

        // 1. Source wallet (base currency) — must exist
        sourceWallet = await WalletModel.findOne({
          user: currentUser.id,
          symbol: baseCurrency,
          tenant: currentTenant.id,
        });
        if (!sourceWallet) {
          throw new Error(`Wallet for ${baseCurrency} not found. Please deposit ${baseCurrency} first.`);
        }

        // 2. Check balance
        if (sourceWallet.amount < data.orderQuantity) {
          throw new Error(`Insufficient ${baseCurrency} balance. Available: ${sourceWallet.amount}, Required: ${data.orderQuantity}`);
        }

        // 3. Target wallet (quote currency) — create if missing (upsert, atomic)
        targetWallet = await WalletModel.findOneAndUpdate(
          { user: currentUser.id, symbol: quoteCurrency, tenant: currentTenant.id },
          {
            $setOnInsert: {
              coinName: quoteCurrency,
              amount: 0,
              status: "available",
              tenant: currentTenant.id,
              createdBy: currentUser.id,
              updatedBy: currentUser.id,
            },
          },
          { upsert: true, new: true }
        );

        // 4. Execute trade — use $inc to avoid full-doc validation on old docs
        if (data.delegateType === "MARKET") {
          await WalletModel.findOneAndUpdate(
            { _id: sourceWallet._id },
            { $inc: { amount: -data.orderQuantity }, $set: { updatedBy: currentUser.id } }
          );
          const receivedAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
          await WalletModel.findOneAndUpdate(
            { _id: targetWallet._id },
            { $inc: { amount: receivedAmount }, $set: { updatedBy: currentUser.id } }
          );
          data.status = "completed";
          data.transactionQuantity = data.orderQuantity;
          data.transactionValue = receivedAmount;
          data.closingPrice = data.commissionPrice;
          data.closingTime = new Date();

        } else if (data.delegateType === "LIMIT") {
          await WalletModel.findOneAndUpdate(
            { _id: sourceWallet._id },
            { $inc: { amount: -data.orderQuantity }, $set: { updatedBy: currentUser.id } }
          );
          await Transaction(options.database).create([{
            type: "order_reserved",
            wallet: sourceWallet._id,
            asset: baseCurrency,
            amount: data.orderQuantity,
            status: "completed",
            direction: "out",
            user: currentUser.id,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: null,
          }], options);
          data.status = "pending";
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

      // Update reservation transactions with order reference
      if (data.delegateType === "LIMIT") {
        await Transaction(options.database).updateOne(
          {
            user: currentUser.id,
            tenant: currentTenant.id,
            type: "order_reserved",
            referenceId: null
          },
          { referenceId: record._id },
          options
        );
      }

      // Create transaction records for completed MARKET trades
      if (data.delegateType === "MARKET") {
        const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');

        if (data.direction === "BUY") {
          // For BUY: Create spot transaction for the asset received
          await Transaction(options.database).create([{
            type: "spot_profit",
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
            updatedBy: currentUser.id,
            referenceId: record._id
          }], options);

          // Also create transaction for the quote currency spent
          await Transaction(options.database).create([{
            type: "spot_loss",
            wallet: sourceWallet._id,
            asset: quoteCurrency,
            relatedAsset: baseCurrency,
            amount: data.entrustedValue || data.orderQuantity * data.commissionPrice,
            status: "completed",
            direction: "out",
            user: currentUser.id,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: record._id
          }], options);

        } else if (data.direction === "SELL") {
          // For SELL: Create spot transaction for the asset sold
          await Transaction(options.database).create([{
            type: "spot_loss",
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
            updatedBy: currentUser.id,
            referenceId: record._id
          }], options);

          // Also create transaction for the quote currency received
          await Transaction(options.database).create([{
            type: "spot_profit",
            wallet: targetWallet._id,
            asset: quoteCurrency,
            relatedAsset: baseCurrency,
            amount: data.entrustedValue || data.orderQuantity * data.commissionPrice,
            status: "completed",
            direction: "in",
            user: currentUser.id,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: record._id
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

  static async UpdateStatus(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Find and validate record
    let record = await Spot(options.database).findById(id);
    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    // Initialize updateData with all possible fields
    const updateData: any = {
      status: data.status,
      updatedBy: currentUser.id,
    };


    // Set closing time if order is being canceled or completed
    if (data.status === "canceled" || data.status === "completed") {
      updateData.closingTime = new Date();
    }

    // If canceling a pending limit order
    if (data.status === "canceled" && record.status === "pending" && record.orderType === "limit") {
      const [baseCurrency, quoteCurrency] = record.tradingPair.split('/');

      if (record.direction === "BUY") {
        // For BUY limit orders: Refund the reserved funds to quote currency wallet
        const quoteWallet = await Wallet(options.database).findOne({
          user: record.userAccount,
          symbol: quoteCurrency,
          tenant: currentTenant.id
        });

        if (quoteWallet) {
          const refundAmount = record.entrustedValue || (record.orderQuantity * record.commissionPrice);
          await Wallet(options.database).findOneAndUpdate(
            { _id: quoteWallet._id },
            { $inc: { amount: refundAmount }, $set: { updatedBy: currentUser.id } }
          );

          // Create cancellation transaction
          await Transaction(options.database).create([{
            type: "order_cancelled",
            wallet: quoteWallet._id,
            asset: quoteCurrency,
            amount: refundAmount,
            status: "completed",
            direction: "in",
            user: record.userAccount,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: record._id
          }], options);
        }

      } else if (record.direction === "SELL") {
        // For SELL limit orders: Return the reserved base currency
        const baseWallet = await Wallet(options.database).findOne({
          user: record.userAccount,
          symbol: baseCurrency,
          tenant: currentTenant.id
        });

        if (baseWallet) {
          await Wallet(options.database).findOneAndUpdate(
            { _id: baseWallet._id },
            { $inc: { amount: record.orderQuantity }, $set: { updatedBy: currentUser.id } }
          );

          // Create cancellation transaction
          await Transaction(options.database).create([{
            type: "order_cancelled",
            wallet: baseWallet._id,
            asset: baseCurrency,
            amount: record.orderQuantity,
            status: "completed",
            direction: "in",
            user: record.userAccount,
            tenant: currentTenant.id,
            dateTransaction: new Date(),
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            referenceId: record._id
          }], options);
        }
      }
    }

    // Update record
    await Spot(options.database).updateOne(
      { _id: id },
      updateData,
      options
    );

    // Create audit log
    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    // Return updated record
    return await this.findById(id, options);
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
          createdBy: filter.user,
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


      criteriaAnd.push({
        status: filter,
      });

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
    // await AuditLogRepository.log(
    //   {
    //     entityName: Spot(options.database).modelName,
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

export default SpotRepository;
