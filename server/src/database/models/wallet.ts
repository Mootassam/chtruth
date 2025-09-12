import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("wallet");
  } catch (error) {
    // continue, because model doesn’t exist
  }

  const WalletSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      symbol: {
        type: String,
        required: true,
      },

      coinName: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
        default: 0,
      },

      status: {
        type: String,
        enum: ["available", "locked", "pending", "suspended"],
        default: "available",
      },

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

  WalletSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  WalletSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WalletSchema.set("toJSON", {
    getters: true,
  });

  WalletSchema.set("toObject", {
    getters: true,
  });

  return database.model("wallet", WalletSchema);
};
