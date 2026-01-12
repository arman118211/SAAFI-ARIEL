import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Extract token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id, iat, exp }

    // 3️⃣ Find seller
    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res.status(401).json({
        message: "Not authorized, seller not found",
      });
    }

    // 4️⃣ Optional: approval check
    if (!seller.isApproved) {
      return res.status(403).json({
        message: "Account not approved",
      });
    }

    // 5️⃣ Attach seller to request
    req.user = seller;

    next();
  } catch (error) {
    console.error("Auth error:", error);

    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};
