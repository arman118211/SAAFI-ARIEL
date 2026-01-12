import Seller from "../models/Seller.js";

export const getOfferTargetTokens = async (offerFor) => {
  let roleFilter = [];

  if (offerFor === "common") {
    // everyone + admin
    roleFilter = ["seller", "retailer", "dealer", "admin"];
  } else if (offerFor === "retailer") {
    roleFilter = ["retailer", "admin"];
  } else if (offerFor === "dealer") {
    roleFilter = ["dealer", "admin"];
  }

  const sellers = await Seller.find({
    role: { $in: roleFilter },
    fcmTokens: { $exists: true, $not: { $size: 0 } },
  }).select("fcmTokens");

  // Flatten all tokens into one array
  const tokens = sellers.flatMap((s) => s.fcmTokens);

  return tokens;
};
