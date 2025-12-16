import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getSellerOrders,
  updateOrderStatus,
  deleteOrder,
  getFormattedOrders,
  getSalesGraphData,
} from "../controllers/orderController.js";


const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.get("/getFormateOrder",getFormattedOrders)
router.get("/getSalesGraphData",getSalesGraphData)

router.get("/:id", getSingleOrder);
router.get("/seller/:sellerId", getSellerOrders);
router.put("/status/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);



export default router;
