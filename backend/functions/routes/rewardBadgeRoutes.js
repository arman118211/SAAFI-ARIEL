import express from "express";
import {
  createRewardBadge,
  getActiveBadges,
  calculateReward,
  updateRewardBadge,
  deleteRewardBadge,
  getAllBadgesForAdmin,
} from "../controllers/rewardBadgeController.js";

const router = express.Router();

/* ================= USER / MODAL ================= */

// Get active reward cards (for modal)
router.get("/", getActiveBadges);

// Calculate reward (scratch / spin)
router.post("/calculate", calculateReward);

/* ================= ADMIN ================= */

// Create badge
router.post("/admin", createRewardBadge);

// Get all badges
router.get("/admin/all", getAllBadgesForAdmin);

// Update badge
router.put("/admin/:id", updateRewardBadge);

// Delete badge
router.delete("/admin/:id", deleteRewardBadge);

export default router;
