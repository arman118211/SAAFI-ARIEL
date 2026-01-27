import express from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  toggleActive,
  allStats,
  getInventoryGraphData,
  getProductsByRole,
  searchProductsByRole
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// PRODUCT CRUD ROUTES
router.post("/add",authMiddleware, addProduct);

router.get("/",authMiddleware, getProducts);

router.get("/allStates",allStats)
router.get("/getInventoryGraphData",getInventoryGraphData)
router.post("/getProductss",getProductsByRole)

router.post("/products/search", searchProductsByRole);


router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", authMiddleware,deleteProduct);

// TOGGLE ACTIVE/INACTIVE
router.patch("/toggle/:id", toggleActive);

export default router;
