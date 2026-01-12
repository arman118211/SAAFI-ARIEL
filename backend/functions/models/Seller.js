import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    companyName: { type: String },
    address: { type: String },
    role: { type: String, enum: ["seller", "retailer", "dealer", "admin"], default: "seller" },
    fcmTokens: {
      type: [String],
      default: []
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SellerSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true, $ne: null }
    }
  }
);

// PASSWORD HASH
SellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// COMPARE PASSWORD
SellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Seller", SellerSchema);
