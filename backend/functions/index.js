import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { onRequest } from "firebase-functions/v2/https";
import connectDB from "./config/db.js";

import sellerAuthRoutes from "./routes/sellerAuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Load env only for local/emulator
dotenv.config();

// Connect DB (should use singleton pattern inside connectDB)
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is running on Firebase Functions Gen-2" });
});

// Routes
app.use("/seller/auth", sellerAuthRoutes);
app.use("/products", productRoutes);
app.use("/offers", offerRoutes);
app.use("/order", orderRoutes);



// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Firebase export (NO app.listen)
export const api = onRequest(
  app
);
