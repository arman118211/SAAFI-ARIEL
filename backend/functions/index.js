import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { onRequest } from "firebase-functions/v2/https";
import connectDB from "./config/db.js";

import sellerAuthRoutes from "./routes/sellerAuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import scretch from "./routes/scretch.js";
import rewardBadgeRoutes from "./routes/rewardBadgeRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: true }));

app.use("/upload", uploadRoutes);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.get("/", (req, res) => {
	res.json({ message: "✅ Backend is running on Firebase Functions Gen-2" });
});

// Other routes
app.use("/seller/auth", sellerAuthRoutes);
app.use("/products", productRoutes);
app.use("/offers", offerRoutes);
app.use("/order", orderRoutes);
app.use("/notification", notificationRoutes);
app.use("/sth", scretch);
app.use("/reward", rewardBadgeRoutes);

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

// Firebase export
export const api = onRequest(app);
