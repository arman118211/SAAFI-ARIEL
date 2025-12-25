import express from "express";
import { registerSeller, loginSeller, getAllseller, updateSellerProfile } from "../controllers/sellerAuthController.js";

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.get("/getAllSeller", getAllseller);
router.put("/update",updateSellerProfile);

export default router;
