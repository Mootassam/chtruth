import MongooseRepository from "./mongooseRepository";

import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Wallet from "../models/wallet";
import Transaction from "../models/transaction";
import { sendNotification } from "../../services/notificationServices";
import axios from "axios";
import User from "../models/user";
import UserRepository from "./userRepository";
class WalletRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // 1️⃣ Perform conversion
    const { from: sourceWallet, to: targetWallet } = await this.convertAsset(
      data,
      options
    );

    const Transaction = options.database.model("transaction");

    // 2️⃣ Log the outgoing conversion (source asset)
    await Transaction.create({
      type: "convert_out",
      wallet: sourceWallet._id,
      asset: data.fromSymbol,
      relatedAsset: data.toSymbol,
      amount: data.fromAmount,
      direction: "out",
      status: "completed",
      user: data.user,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
    });

    // 3️⃣ Log the incoming conversion (target asset)
    await Transaction.create({
      type: "convert_in",
      wallet: targetWallet._id,
      asset: data.toSymbol,
      relatedAsset: data.fromSymbol,
      amount: data.toAmount,
      direction: "in",
      status: "completed",
      user: data.user,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
    });

    return {
      sourceWallet,
      targetWallet,
    };
  }

  static async convertAsset(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Deduct from source wallet
    const sourceWallet = await Wallet(options.database).findOneAndUpdate(
      {
        user: data.user,
        symbol: data.fromSymbol,

        amount: { $gte: data.fromAmount }, // ensure enough balance
      },
      {
        $inc: { amount: -data.fromAmount },
        $set: { updatedBy: currentUser.id },
      },
      { new: true }
    );

    if (!sourceWallet) {
      throw new Error("Insufficient balance in source wallet");
    }

    // Add to target wallet
    const targetWallet = await Wallet(options.database).findOneAndUpdate(
      {
        user: data.user,
        symbol: data.toSymbol,
      },
      {
        $inc: { amount: data.toAmount },
        $setOnInsert: {
          coinName: data.toSymbol,
          status: "available",
          tenant: currentTenant.id,
          createdBy: currentUser.id,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return {
      from: sourceWallet,
      to: targetWallet,
    };
  }

  //   static async create(data, options: IRepositoryOptions) {
  //   const currentTenant = MongooseRepository.getCurrentTenant(options);
  //   const currentUser = MongooseRepository.getCurrentUser(options);
  //   const [record] = await Wallet(options.database).create(
  //     [
  //       {
  //         ...data,
  //         tenant: currentTenant.id,
  //         createdBy: currentUser.id,
  //         updatedBy: currentUser.id,
  //       },
  //     ],
  //     options
  //   );

  //   await this._createAuditLog(
  //     AuditLogRepository.CREATE,
  //     record.id,
  //     data,
  //     options
  //   );

  //   return this.findById(record.id, options);


  // }



  static async updateAmount(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    // const record = await Wallet(options.database).find({
    //   user: id,
    //   symbol: data.rechargechannel.toUpperCase(),
    // });

    // const rows = await Wallet(options.database).updateOne(
    //   { user: id, symbol: data.rechargechannel.toUpperCase() }, // filter
    //   {
    //     $inc: { amount: data.amount },
    //   }, // update
    //   options // options
    // );

    await sendNotification({
      userId: id, // the user to notify
      message: ``,
      type: "deposit", // type of notification
      options, // your repository options
    });


  }

  static async createMobile(data, options: IRepositoryOptions) {
    const [record] = await Wallet(options.database).create(
      [
        {
          ...data,
          tenant: data.tenant,
          createdBy: data.createdBy.id,
          updatedBy: data.updatedBy.id,
        },
      ],
      options
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    );

    return this.findByIdMobile(record.id, data.tenant, options);
  }
  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Wallet(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Wallet(options.database).updateOne(
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

  // static async updateAmount(id, data, options: IRepositoryOptions) {
  //   const currentTenant = MongooseRepository.getCurrentTenant(options);
  //   const record = await Wallet(options.database).find({
  //     user: id,
  //     symbol: data.rechargechannel.toUpperCase(),
  //   });

  //   const rows = await Wallet(options.database).updateOne(
  //     { user: id, symbol: data.rechargechannel.toUpperCase()}, // filter
  //     {
  //       $inc: { amount: data.amount },
  //     }, // update
  //     options // options
  //   );

  //   await sendNotification({
  //     userId: id, // the user to notify
  //     message: ` ${data.amount} ${data.rechargechannel.toUpperCase()} `,
  //     type: "deposit", // type of notification
  //     options, // your repository options
  //   });

  //   return record;
  // }


  static async processDeposit(userId, data, options) {
    const db = options.database;
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const coinSymbol = data.rechargechannel.toUpperCase();
    const depositAmount = Number(data.amount);

    // 0️⃣ Fetch user data
    const currentUser = await User(db).findById(userId);
    if (!currentUser) throw new Error("User not found");

    // If status is canceled, only send notification and return
    if (data.status === "canceled") {
      sendNotification({
        userId,
        message: `${depositAmount} ${coinSymbol}`,
        type: "cancel_deposit",
        options,
      }).catch(console.error);

      return {
        depositedAmount: depositAmount,
        coin: coinSymbol,
        usdtEquivalent: 0,
        status: "canceled",
      };
    }

    // 1️⃣ Update depositor wallet in deposited coin
    await Wallet(db).updateOne(
      { user: userId, symbol: coinSymbol },
      { $inc: { amount: depositAmount } },
      { upsert: true }
    );

    // Send deposit notification to depositor
    sendNotification({
      userId,
      message: `${depositAmount} ${coinSymbol}`,
      type: "deposit",
      options,
    }).catch(console.error);

    // 2️⃣ Convert deposit to USDT for referral rewards
    let usdtAmount = depositAmount;

    if (coinSymbol !== "USDT") {
      try {
        const coinMap = {
          BTC: "bitcoin",
          ETH: "ethereum",
          SOL: "solana",
          XRP: "ripple",
          USDT: "tether",
        };

        const coinId = coinMap[coinSymbol];
        if (!coinId) throw new Error(`Unsupported coin: ${coinSymbol}`);

        const resp = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: coinId,
              vs_currencies: "usd",
            },
          }
        );

        const price = Number(resp.data[coinId]?.usd || 0);
        if (!price) throw new Error("Price not found from CoinGecko");

        usdtAmount = depositAmount * price;
      } catch (err) {
        console.error("Error converting coin to USDT", err);
        throw new Error(
          "Failed to convert deposit to USDT for referral rewards."
        );
      }
    }

    // ✅ Check if this is the user's first deposit
    if (!currentUser.firstDepositDone) {
      // 3️⃣ Reward percentages per generation
      const rewardPercentages = [15, 10, 5]; // 1st, 2nd, 3rd generation

      // 4️⃣ Traverse referral chain upward
      let refSourceUser = currentUser;
      for (let level = 1; level <= 3; level++) {
        if (!refSourceUser.invitationcode) break;

        const refUser = await User(db).findOne({
          refcode: refSourceUser.invitationcode,
        });
        if (!refUser) break;

        const reward = (usdtAmount * rewardPercentages[level - 1]) / 100;

        // 4a️⃣ Update referrer wallet and get the updated document
        const wallet = await Wallet(db).findOneAndUpdate(
          { user: refUser._id, symbol: "USDT" },
          { $inc: { amount: reward } },
          { upsert: true, new: true }
        );

        // 4b️⃣ Log reward transaction
        await Transaction(db).create({
          user: refUser._id,
          amount: reward,
          asset: "USDT",
          wallet: wallet._id,
          direction: "in",
          status: "completed",
          type: "reward",
          description: `Referral reward from ${level} generation`,
          createdBy: userId,
          tenant: currentTenant.id,
        });

        // 4c️⃣ Send notification
        sendNotification({
          userId: refUser._id,
          message: `You earned ${reward.toFixed(
            2
          )} USDT as ${level} generation referral reward from ${currentUser.email || "a user"
            }.`,
          type: "commission",
          options,
        }).catch(console.error);

        // Move up the chain
        refSourceUser = refUser;
      }

      // ✅ Mark user as having completed their first deposit
      await User(db).updateOne(
        { _id: userId },
        { firstDepositDone: true }
      );
    }

    return {
      depositedAmount: depositAmount,
      coin: coinSymbol,
      usdtEquivalent: usdtAmount,
      status: "success",
    };
  }


  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Wallet(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Wallet(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Wallet(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Wallet(options.database)
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

  static async findByUser(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await Wallet(options.database)
      .find({ user: id })
      .populate("user");

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findByIdMobile(id, tenenant, options: IRepositoryOptions) {
    let record = await MongooseRepository.wrapWithSessionIfExists(
      Wallet(options.database)
        .findById(id)
        .populate("auditor")
        .populate("createdBy"),
      options
    );

    if (!record || String(record.tenant) !== String(tenenant)) {
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
    let rows = await Wallet(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Wallet(options.database).countDocuments(criteria);

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
      user: currentUser.id,
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
    let rows = await Wallet(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Wallet(options.database).countDocuments(criteria);

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

    const records = await Wallet(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.symbol,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    // await AuditLogRepository.log(
    //   {
    //     entityName: Wallet(options.database).modelName,
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

  static async createDefaultAssets(
    newUser,
    tenantId,
    options: IRepositoryOptions
  ) {
    const defaultWallets = [
      {
        user: newUser.id,
        symbol: "BTC",
        coinName: "Bitcoin",
        amount: 0,
        status: "available",
        tenant: tenantId,
        createdBy: newUser,
        updatedBy: newUser,
      },
      {
        user: newUser.id,
        symbol: "ETH",
        coinName: "Ethereum",
        amount: 0,
        status: "available",
        tenant: tenantId,
        createdBy: newUser,
        updatedBy: newUser,
      },
      {
        user: newUser.id,
        symbol: "USDT",
        coinName: "Tether",
        amount: 0,
        status: "available",
        tenant: tenantId,
        createdBy: newUser,
        updatedBy: newUser,
      },
      {
        user: newUser.id,
        symbol: "SOL",
        coinName: "Solana",
        amount: 0,
        status: "available",
        tenant: tenantId,
        createdBy: newUser,
        updatedBy: newUser,
      },
      {
        user: newUser.id,
        symbol: "XRP",
        coinName: "Ripple",
        amount: 0,
        status: "available",
        tenant: tenantId,
        createdBy: newUser,
        updatedBy: newUser,
      },
    ];

    const createdWallets: any[] = [];
    for (const WalletData of defaultWallets) {
      const asset = await this.createMobile(WalletData, options);
      createdWallets.push(asset);
    }

    return createdWallets;
  }
}

export default WalletRepository;
