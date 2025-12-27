import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadBase64Image } from "../controllers/uploadController.js";

const router = express.Router();

// router.post(
//   "/image",
//   upload.single("image"), // field name must be "image"
//   uploadImageController
// );

router.post("/base64", uploadBase64Image);



export default router;
