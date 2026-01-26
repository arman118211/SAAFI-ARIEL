import mongoose from "mongoose";

const rewardBadgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    minPurchaseQty: {
      type: Number, // jaise 30 bora
      required: true,
    },

    rewardType: {
      type: String,
      enum: ["cash", "gift", "discount"],
      default: "cash",
    },

    rewardMinAmount: {
      type: Number, // 500
      required: true,
    },

    rewardMaxAmount: {
      type: Number, // 1000
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    validFrom: {
      type: Date,
      required: true,
    },

    validTill: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RewardBadge", rewardBadgeSchema);
