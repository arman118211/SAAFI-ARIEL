import { bucket } from "../config/firebase.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";


export const uploadBase64Image = async (req, res) => {
  try {
    const { imageBase64, fileName } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Image base64 data is required",
      });
    }

    // Remove base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const finalFileName = `uploads/${uuidv4()}-${fileName || "image.png"}`;
    const file = bucket.file(finalFileName);

    await file.save(buffer, {
      metadata: {
        contentType: "image/png", // or image/jpeg
      },
    });

    await file.makePublic(); // optional

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${finalFileName}`;

    return res.status(200).json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    console.error("Base64 upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Base64 image upload failed",
    });
  }
};

export const deleteFromStorage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // Example URL:
    // https://storage.googleapis.com/BUCKET_NAME/uploads/abc.png
    const decodedUrl = decodeURIComponent(imageUrl);

    const filePath = decodedUrl.split(`${bucket.name}/`)[1];

    if (!filePath) return;

    const file = bucket.file(filePath);
    await file.delete();

    console.log("✅ Image deleted:", filePath);
  } catch (error) {
    console.error("❌ Failed to delete image:", error.message);
  }
};

