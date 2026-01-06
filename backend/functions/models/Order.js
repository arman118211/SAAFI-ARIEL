import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true } ,// snapshot price
        discount:{
          type: Number,
          default: 0, // % discount
        },
      }
    ],

    totalQty: {
      type: Number,
      required: true,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },

    // optional → order belongs to which offer?
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
