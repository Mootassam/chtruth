import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("stacking");
  } catch (error) {
    // continue, because model doesnt exist
  }

 const StakingSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      currency: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      apy: {
        type: Number, // store as percent e.g., 5.2 for 5.2%
        required: true,
      },

      minimumStake: {
        type: Number,
        required: true,
      },

      unstakingPeriod: {
        type: Number, // in days
        required: true,
      },

      status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
      },

      startDate: {
        type: Date,
        default: Date.now,
      },

      endDate: {
        type: Date,
      },

      earnedRewards: {
        type: Number,
        default: 0,
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


  StakingSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StakingSchema.set("toJSON", {
    getters: true,
  });

  StakingSchema.set("toObject", {
    getters: true,
  });

  return database.model("stacking", StakingSchema);
};
