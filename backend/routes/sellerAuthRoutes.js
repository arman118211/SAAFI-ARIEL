import express from "express";
import { registerSeller, loginSeller, getAllseller } from "../controllers/sellerAuthController.js";

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.get("/getAllSeller", getAllseller);


export default router;
