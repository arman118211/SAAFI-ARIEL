// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     unit: {
//       type: String,
//       required: true,  // Example: kg, liter, packet,bora
//     },

//     stock: {
//       type: Number,
//       default: 0,
//     },

//     category: {
//       type: String,
//       default: "",
//     },

//     imageUrl: {
//       type: String,
//       default: "",
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", ProductSchema);
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    // 🔹 Features & Usage
    keyFeatures: {
      type: [String], // array of bullet points
      default: [],
    },

    usageInstruction: {
      type: String,
      default: "",
    },

    // 🔹 Quantity & Packing
    quantity: {
      type: String,
      required: true, // e.g. 150gm, 1kg, 1L
    },

    packSize: {
      type: Number,
      required: true, // e.g. 10, 12, 25 packets in one bag
    },

    // 🔹 Market Price
    marketPrice: {
      type: Number,
      required: true,
    },

    marketDiscount: {
      type: Number,
      default: 0, // percentage
    },

    // 🔹 Retailer Price
    retailerPrice: {
      type: Number,
      required: true,
    },

    retailerDiscount: {
      type: Number,
      default: 0, // percentage
    },

    // 🔹 Dealer Price
    dealerPrice: {
      type: Number,
      required: true,
    },

    dealerDiscount: {
      type: Number,
      default: 0, // percentage
    },

    // 🔹 Inventory
    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
