import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("stackingPlan");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const StackingPlanSchema = new Schema(
    {
      currency: {
        type: String,
        enum: ["USDT", "SUI", "XRP", "SOL", "BTC", "ETH"], // allowed coins
        required: true,
      },

      dailyRate: {
        type: Number, // percent per day, e.g., 0.5 = 0.5%
        required: true,
      },

      minimumStake: {
        type: Number,
        required: true,
      },

      maxStake: {
        type: Number,
        required: true,
      },

      unstakingPeriod: {
        type: Number, // in days
        required: true,
      },
  

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "user" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
      importHash: { type: String },
    },
    { timestamps: true }
  );

  StackingPlanSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StackingPlanSchema.set("toJSON", {
    getters: true,
  });

  StackingPlanSchema.set("toObject", {
    getters: true,
  });

  return database.model("stackingPlan", StackingPlanSchema);
};
