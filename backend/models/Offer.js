import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        minQty: { type: Number, default: 1 } // optional (bulk purchase rule)
      }
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "closed"],
      default: "inactive",
    },

    sellerPurchases: [
      {
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seller",
          required: true,
        },
        totalQty: { type: Number, default: 0 },
        orders: [
          {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
            qty: Number,
            date: { type: Date, default: Date.now },
          }
        ],
        hasSeenWin: { type: Boolean, default: false }
      }
    ],

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);
