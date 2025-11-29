import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String },
    address: { type: String },
    role: { type: String, enum: ["seller", "admin"], default: "seller" },
  },
  { timestamps: true }
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
