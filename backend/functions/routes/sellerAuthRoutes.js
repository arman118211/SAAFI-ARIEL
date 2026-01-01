import express from "express";
import { registerSeller, loginSeller, getAllseller, updateSellerProfile, updateSellerApproval } from "../controllers/sellerAuthController.js";

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/getAllSeller", getAllseller);
router.put("/update",updateSellerProfile);
router.post("/approveDealer",updateSellerApproval);

export default router;
