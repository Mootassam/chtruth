import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("Recharge");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RechargeSchema = new Schema(
    {
      rechargeamount: {
        type: String,
      },

      rechargechannel: {
        type: String,
      },

      type: {
        type: String,
        enum: ["withdraw", "deposit"],
        default: "withdraw",
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      dateRecharge: {
        type: Date,
      },

      status: {
        type: String,
        enum: ["pending", "canceled", "success"],
        default: "enable",
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

  RechargeSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  RechargeSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RechargeSchema.set("toJSON", {
    getters: true,
  });

  RechargeSchema.set("toObject", {
    getters: true,
  });

  return database.model("Recharge", RechargeSchema);
};
