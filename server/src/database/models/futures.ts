import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("futures");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const FuturesSchema = new Schema(
    {
      futuresAmount: {
        type: Number,
        required: true,
      },

      contractDuration: {
        type: String, // e.g., '1h', '1d', '1w'
        required: true,
      },

      futuresStatus: {
        type: String,
        enum: ["long", "short"], // Direction of position
        default: "long",
      },

      openPositionPrice: {
        type: Number,
        required: true,
      },

      openPositionTime: {
        type: Date,
        required: true,
      },

      closePositionPrice: {
        type: Number,
      },

      closePositionTime: {
        type: Date,
      },

      profitAndLossAmount: {
        type: Number,
        default: 0,
      },

      leverage: {
        type: Number,
        default: 1,
      },

      control: {
        type: String,
        enum: ["Normal", "Loss", "Profit"],
        default: "Normal",
      },

      operate: {
        type: String,
        enum: ["High", "Low"],
        default: "Low",
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  FuturesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  FuturesSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  FuturesSchema.set("toJSON", { getters: true });
  FuturesSchema.set("toObject", { getters: true });

  return database.model("futures", FuturesSchema);
};
