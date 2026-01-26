import express from "express";
import {
	createScratchCampaign,
	updateScratchCampaign,
	scratchCampaign,
	getLiveCampaigns,
    getScratchCampaignById
} from "../controllers/scratchCampaignController.js";

const router = express.Router();

// admin
router.post("/create", createScratchCampaign);
router.put("/update/:id", updateScratchCampaign);

router.get("/live", getLiveCampaigns);
router.post("/scratch", scratchCampaign);

router.get("/:scratchCouponId", getScratchCampaignById);

// user



export default router;
