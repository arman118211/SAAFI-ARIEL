import Seller from "../models/Seller.js";

export const saveFcmToken = async (req, res) => {
  console.log("token save is calling ==>")
  const { token } = req.body;

  console.log("token-->",token,"userId-->",req.user._id)
  const userId = req.user._id; // from auth middleware

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  await Seller.updateOne(
    { _id: userId },
    { $addToSet: { fcmTokens: token } }
  );

  res.json({ success: true });
};
