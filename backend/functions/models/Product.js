import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,  // Example: kg, liter, packet,bora
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
