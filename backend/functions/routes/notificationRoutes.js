import express from "express";

import { saveFcmToken } from "../controllers/notifiactionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save-token",authMiddleware ,saveFcmToken);

export default router;
