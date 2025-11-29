import express from "express";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  activateOffer,
  deactivateOffer,
  closeOffer,
  addSellerPurchase,
  declareWinner,
  getAllOfferForAdmin
} from "../controllers/offerController.js";

const router = express.Router();

// ADMIN ROUTES
router.post("/", createOffer);
router.get("/offer", getAllOffers);
router.get("/getAllOffersForAmin", getAllOfferForAdmin);
router.get("/:id", getOfferById);
router.put("/:id", updateOffer);
router.patch("/activate/:id", activateOffer);
router.patch("/deactivate/:id", deactivateOffer);
router.patch("/close/:id", closeOffer);
router.patch("/winner/:id", declareWinner);

// SELLER PURCHASE → When order created
router.post("/purchase/:offerId", addSellerPurchase);

export default router;
