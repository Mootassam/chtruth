import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("transaction");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TransactionSchema = new Schema(
    {
      // ✅ Deposit, Withdraw, Convert
      type: {
        type: String,
        enum: ["deposit", "withdraw", "convert_in", "convert_out"],
        required: true,
      },

      // ✅ Which coin (BTC, ETH, USDT, etc.)
      wallet: {
        type: Schema.Types.ObjectId,
        ref: "wallet",
        required: true,
      },
      asset: {
        type: String,
        required: true,
      },

      // ✅ If conversion, show the "other side" of the trade
      relatedAsset: {
        type: String,
      },

      // ✅ Amount in that asset
      amount: {
        type: Number,
        required: true,
      },

      // ✅ Status of transaction
      status: {
        type: String,
        enum: ["pending", "canceled", "completed"],
        default: "pending",
      },

      // ✅ Direction (in/out) helps for UI
      direction: {
        type: String,
        enum: ["in", "out"],
        required: true,
      },

      // ✅ User reference
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      // ✅ Date of transaction
      dateTransaction: {
        type: Date,
        default: Date.now,
      },

      // ✅ Multi-tenancy (if you need it)
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  TransactionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  TransactionSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TransactionSchema.set("toJSON", {
    getters: true,
  });

  TransactionSchema.set("toObject", {
    getters: true,
  });

  return database.model("transaction", TransactionSchema);
};
