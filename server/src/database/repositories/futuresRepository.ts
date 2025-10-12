import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Futures from "../models/futures";
import Wallet from "../models/wallet";
// 1. CORRECT THE IMPORT: Import the Queue, not the Worker
import { sendNotification } from "../../services/notificationServices";
import Error405 from "../../errors/Error405";
import Transaction from '../models/transaction'
class FuturesRepository {
  // inside FuturesRepository class:

  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Validate futures amount
    if (!data.futuresAmount || data.futuresAmount <= 0) {
      throw new Error('Futures amount must be greater than 0');
    }

    // Get user's USDT wallet and check balance
    const walletModel = Wallet(options.database);
    const transactionModel = Transaction(options.database);

    const usdtWallet = await walletModel.findOne({
      user: currentUser.id,
      symbol: "USDT",
      tenant: currentTenant.id,
    });

    if (!usdtWallet) {
      throw new Error('USDT wallet not found');
    }

    if (usdtWallet.amount < data.futuresAmount) {
      throw new Error('Insufficient USDT balance');
    }

    if (usdtWallet.status !== 'available') {
      throw new Error('USDT wallet is not available for trading');
    }

    try {
      // 1. Deduct the futures amount from USDT wallet
      const updatedWallet = await walletModel.findOneAndUpdate(
        {
          _id: usdtWallet._id,
          tenant: currentTenant.id,
          amount: { $gte: data.futuresAmount }
        },
        {
          $inc: { amount: -data.futuresAmount },
          $set: { updatedBy: currentUser.id, updatedAt: new Date() },
        },
        { new: true }
      );

      if (!updatedWallet) {
        throw new Error('Insufficient funds in wallet after validation');
      }

      const openPositionTime = data.openPositionTime
        ? new Date(data.openPositionTime)
        : new Date();

      const durationMs = await this.parseDurationToMs(
        data.contractDuration || "60s"
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

      // 2. Create the futures trade
      const [record] = await Futures(options.database).create([payload], options);

      // 3. Create transaction record for the deduction
      await transactionModel.create({
        type: "futures_reserved",
        referenceId: record._id,
        wallet: usdtWallet._id,
        asset: "USDT",
        amount: data.futuresAmount,
        status: "completed",
        direction: "out",
        user: currentUser.id,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        dateTransaction: new Date(),
        description: `Futures trade reserved: ${data.futuresAmount} USDT for ${data.futuresStatus} position`
      });

      await sendNotification({
        userId: currentUser.id,
        message: `Futures trade created: ${data.futuresAmount} USDT`,
        type: "futures",
        forAdmin: true,
        options,
      });

      await this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        payload,
        options
      );

      return this.findById(record.id, options);

    } catch (error) {
      console.error('Futures creation failed:', error);
      throw error;
    }
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const FuturesModel = Futures(options.database);
    const walletModel = Wallet(options.database);
    const transactionModel = Transaction(options.database);

    // Load record
    let record = await FuturesModel.findById(id);

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    if (record.finalized) {
      throw new Error405(
        "This futures entry is already finalized and cannot be changed."
      );
    }

    const isControlUpdate = data.control === "loss" || data.control === "profit";

    // Your profit calculation formula with null checks
    const calculateProfit = (
      amount: number,
      leverage: any,
      duration: any
    ): number => {
      // Convert to numbers with proper null checks
      const leverageNum = parseInt(leverage?.toString() || '0', 10);
      const durationNum = parseInt(duration?.toString() || '0', 10);
      const amountNum = amount || 0;

      return (amountNum * leverageNum * durationNum) / 100;
    };

    // NEW: Calculate closing price based on your data pattern
// UPDATED: Calculate closing price based on your new requirements
const calculateClosingPrice = (
  openPrice: number,
  direction: string, // "long" or "short" 
  control: string,   // "profit" or "loss"
  assetType: string  // "BTC/USDT", "ETH/USDT", etc.
): number => {
  const basePrice = openPrice;
  
  // Generate random value between 5 and 90
  const randomValue = 5 + (Math.random() * 85); // 5 to 90

  if (control === "profit") {
    // For winning trades: open price + random value (5 to 90)
    if (direction === "long") {
      // BUY UP win: price increases by random value
      return basePrice + randomValue;
    } else {
      // BUY FALL win: price decreases by random value  
      return basePrice - randomValue;
    }
  } else {
    // For losing trades: open price - random value (5 to 90)
    if (direction === "long") {
      // BUY UP loss: price decreases by random value
      return basePrice - randomValue;
    } else {
      // BUY FALL loss: price increases by random value
      return basePrice + randomValue;
    }
  }
};

    try {
      if (isControlUpdate) {
        const selectedWallet = await walletModel.findOne({
          user: record.createdBy,
          symbol: "USDT",
          tenant: currentTenant.id,
        });

        if (!selectedWallet) {
          throw new Error405(`USDT wallet not found for user ${record.createdBy}`);
        }

        // CALCULATE PROFIT USING YOUR FORMULA WITH SAFE ACCESS
        const profitAmount = calculateProfit(
          record.futuresAmount,
          record.leverage,
          record.contractDuration
        );

        const lossAmount = record.futuresAmount;

        // VALIDATE AND USE MANUAL CLOSING PRICE (MAX $100)
        let closePrice = data.closePositionPrice; // Use provided closing price

        // Validate closing price doesn't exceed $100
        if (closePrice && closePrice > 100) {
          throw new Error405("Closing price cannot exceed $100");
        }

        // If no manual closing price provided, calculate it USING NEW FORMULA
        if (!closePrice) {
          closePrice = calculateClosingPrice(
            record.openPositionPrice,
            record.futuresStatus, // "long" or "short"
            data.control, // "profit" or "loss"
            record.futuresPair // "BTC/USDT", "ETH/USDT", etc.
          );
        }

        // USE MANUAL CLOSE TIME OR CURRENT TIME
        const closeTime = data.closePositionTime || new Date();

        // USE MANUAL PROFIT/LOSS AMOUNT OR CALCULATE IT
        let finalProfitLossAmount;
        if (data.profitAndLossAmount !== undefined) {
          finalProfitLossAmount = data.profitAndLossAmount;
        } else {
          // Use your profit formula for profit, keep existing logic for loss
          finalProfitLossAmount = data.control === "profit" ? profitAmount : -lossAmount;
        }

        // Handle wallet updates based on profit/loss
        if (data.control === "profit") {
          if (!(profitAmount > 0)) {
            throw new Error405("Profit amount is zero or invalid.");
          }

          // Add profit to wallet (original amount + profit)
          await walletModel.findOneAndUpdate(
            { _id: selectedWallet._id, tenant: currentTenant.id },
            {
              $inc: { amount: profitAmount + record.futuresAmount },
              $set: { updatedBy: currentUser.id, updatedAt: new Date() },
            },
            { new: true }
          );

          // Create profit transaction
          await transactionModel.create({
            type: "futures_profit",
            referenceId: record._id,
            wallet: selectedWallet._id,
            asset: "USDT",
            amount: profitAmount + record.futuresAmount,
            status: "completed",
            direction: "in",
            user: record.createdBy,
            tenant: currentTenant.id,
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            dateTransaction: new Date(),
            description: `Futures profit: ${profitAmount} USDT profit + ${record.futuresAmount} USDT returned`
          });

        } else {
          // For loss - amount was already deducted during creation
          // Just record the loss transaction (no wallet update needed)
          const lossAmount = record.futuresAmount;

          if (!(lossAmount > 0)) {
            throw new Error405("Loss amount is zero or invalid.");
          }

          // Create loss transaction (amount already deducted during trade creation)
          await transactionModel.create({
            type: "futures_loss",
            referenceId: record._id,
            wallet: selectedWallet._id,
            asset: "USDT",
            amount: lossAmount,
            status: "completed",
            direction: "out",
            user: record.createdBy,
            tenant: currentTenant.id,
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            dateTransaction: new Date(),
            description: `Futures loss: ${lossAmount} USDT (Trade amount lost)`
          });
        }

        // Finalize futures record WITH MANUAL VALUES
        await FuturesModel.updateOne(
          { _id: id, tenant: currentTenant.id, finalized: { $ne: true } },
          {
            $set: {
              control: data.control,
              finalized: true,
              finalizedAt: new Date(),
              updatedBy: currentUser.id,
              profitAndLossAmount: finalProfitLossAmount,
              closePositionPrice: closePrice,
              closePositionTime: closeTime,
            },
          }
        );

      } else {
        // Regular update (non-control update) - allow updating closing price and time
        const updateData = { ...data, updatedBy: currentUser.id };

        // Validate closing price for regular updates too
        if (data.closePositionPrice && data.closePositionPrice > 100) {
          throw new Error405("Closing price cannot exceed $100");
        }

        await FuturesModel.updateOne(
          { _id: id, tenant: currentTenant.id },
          updateData
        );
      }

      await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

      record = await this.findById(id, options);
      return record;

    } catch (err) {
      throw err;
    }
  }

  // Helper method to calculate profit amount
  static calculateProfitAmount(futuresRecord) {
    // Your profit calculation logic here
    // This is a simplified example - adjust based on your business rules
    const baseAmount = futuresRecord.futuresAmount;
    const leverage = futuresRecord.leverage;
    const duration = futuresRecord.contractDuration;

    // Example calculation: profit = baseAmount * leverage * durationMultiplier
    let durationMultiplier = 1;

    // Adjust profit based on contract duration
    switch (futuresRecord.contractDuration) {
      case '60s':
        durationMultiplier = 0.10; // 10%
        break;
      case '120s':
        durationMultiplier = 0.20; // 20%
        break;
      case '180s':
        durationMultiplier = 0.40; // 40%
        break;
      case '240s':
        durationMultiplier = 0.80; // 80%
        break;
      default:
        durationMultiplier = 0.10; // 10% default
    }

    return baseAmount * leverage * durationMultiplier;
  }

  static async parseDurationToMs(duration: string | number | undefined) {
    if (duration == null) return 0;
    if (typeof duration === "number") return duration * 1000; // assume seconds
    if (typeof duration !== "string") return 0;

    const trimmed = duration.trim().toLowerCase();

    if (/^\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10) * 1000;
    }

    const m = trimmed.match(/^(\d+)(s|m|h|d)?$/);
    if (!m) return 0;

    const v = Number(m[1]);
    const unit = m[2] || "s";

    switch (unit) {
      case "s":
        return v * 1000;
      case "m":
        return v * 60 * 1000;
      case "h":
        return v * 60 * 60 * 1000;
      case "d":
        return v * 24 * 60 * 60 * 1000;
      default:
        return v * 1000;
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
      Futures(options.database)
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
    { filter, limit = 500, offset = 0, orderBy = "" },
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
    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 500, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    criteriaAnd.push({
      createdBy: currentUser.id,
    });



    if (filter) {
      criteriaAnd.push({
        finalized: filter,
      });

      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      criteriaAnd.push({
        createdBy: currentUser.id,
      });

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
      .sort(sort)
      .populate("createdBy");

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
    // await AuditLogRepository.log(
    //   {
    //     entityName: Futures(options.database).modelName,
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

export default FuturesRepository;
