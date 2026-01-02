import Offer from "../models/Offer.js";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Seller from "../models/Seller.js";

// CREATE OFFER (Admin)
export const createOffer = async (req, res) => {
  try {
    console.log("req body",req.body)
    const offer = await Offer.create(req.body);
    res.status(201).json({ success: true, message: "Offer created", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ALL OFFERS
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("products.productId");
    res.json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET SINGLE OFFER
// export const getOfferById = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id)
//       .populate("products.productId")
//       .populate("sellerPurchases.sellerId")
//       .populate("winner");

//     if (!offer) return res.status(404).json({ message: "Offer not found" });

//     res.json({ success: true, offer });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("products.productId")
      .populate("sellerPurchases.sellerId")
      .populate("winner")
      .lean(); // 🔥 VERY IMPORTANT

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.products = offer.products.map((item) => {
      const product = item.productId;

      let price = 0;
      let discount = 0;

      if (offer.offerFor === "common") {
        price = product.marketPrice;
        discount = product.marketDiscount;
      } else if (offer.offerFor === "retailer") {
        price = product.retailerPrice;
        discount = product.retailerDiscount;
      } else if (offer.offerFor === "dealer") {
        price = product.dealerPrice;
        discount = product.dealerDiscount;
      }

      // ✅ add visible fields
      product.price = price;
      product.discount = discount;

      // ❌ remove internal pricing
      delete product.marketPrice;
      delete product.marketDiscount;
      delete product.retailerPrice;
      delete product.retailerDiscount;
      delete product.dealerPrice;
      delete product.dealerDiscount;

      return item;
    });

    // 🔒 Hide sensitive data for retailer & dealer
    if (offer.offerFor !== "common") {
      delete offer.sellerPurchases;
      delete offer.winner;
    }

    res.json({
      success: true,
      offer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




// UPDATE OFFER
export const updateOffer = async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Offer updated", updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ACTIVATE OFFER
export const activateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.status = "active";
    await offer.save();

    res.json({ success: true, message: "Offer activated", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DEACTIVATE OFFER
export const deactivateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.status = "inactive";
    await offer.save();

    res.json({ success: true, message: "Offer deactivated", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CLOSE OFFER
export const closeOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.status = "closed";
    await offer.save();

    res.json({ success: true, message: "Offer closed", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ADD SELLER PURCHASE (Add Order to Offer)
export const addSellerPurchase = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { sellerId, orderId, qty } = req.body;

    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    // find existing seller entry
    const sellerEntry = offer.sellerPurchases.find(
      (s) => s.sellerId.toString() === sellerId
    );

    if (sellerEntry) {
      sellerEntry.totalQty += qty;
      sellerEntry.orders.push({ orderId, qty });
    } else {
      offer.sellerPurchases.push({
        sellerId,
        totalQty: qty,
        orders: [{ orderId, qty }],
      });
    }

    await offer.save();

    res.json({ success: true, message: "Purchase added", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DECLARE WINNER
export const declareWinner = async (req, res) => {
  try {
    const { winnerId } = req.body;
    const offer = await Offer.findById(req.params.id);

    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.winner = winnerId;
    offer.status = "closed";
    await offer.save();

    res.json({ success: true, message: "Winner selected", offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllOfferForAdmin = async (req, res) => {
  try {
    const offers = await Offer.find()
      // Populate product details
      .populate({
        path: "products.productId",
        model: "Product",
        select: "name imageUrl category stock packSize quantity retailerPrice marketPrice dealerPrice",
      })
      // Populate seller details inside sellerPurchases
      .populate({
        path: "sellerPurchases.sellerId",
        model: "Seller",
        select: "name email phone companyName",
      })
      // Populate order details (optional)
      .populate({
        path: "sellerPurchases.orders.orderId",
        model: "Order",
        select: "orderNumber totalAmount date",
      });

    res.json({
      success: true,
      data: offers,
    });
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// get all active offer
// export const getActiveOffers = async (req, res) => {
//   try {
//     const now = new Date();

//     const offers = await Offer.find({
//       endDate: { $gte: now },          // not crossed deadline
//       status: { $ne: "closed" },       // not closed
//     })
//       .select("-winner")               // exclude winner field
//       .populate("products.productId") // optional
//       .populate("sellerPurchases.sellerId");        // optional

//     res.status(200).json({
//       success: true,
//       count: offers.length,
//       offers,
//     });

//   } catch (error) {
//     console.error("Error fetching active offers:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch active offers",
//     });
//   }
// };
export const getActiveOffers = async (req, res) => {
  try {
    
    const now = new Date();
    const { role } = req.body; // role: "common" | "retailer" | "dealer"

    // default: common user
    let offerForFilter = ["common"];

    if (role === "retailer") {
      offerForFilter = ["common", "retailer"];
    } 
    else if (role === "dealer") {
      offerForFilter = ["common", "dealer"];
    }

    const offers = await Offer.find({
      endDate: { $gte: now },            // not expired
      status: { $ne: "closed" },         // not closed
      offerFor: { $in: offerForFilter }  // role-based filter
    })
      .select("-winner")
      .populate("products.productId")
      .populate("sellerPurchases.sellerId");

    res.status(200).json({
      success: true,
      count: offers.length,
      offers,
    });

  } catch (error) {
    console.error("Error fetching active offers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch active offers",
    });
  }
};


export const getWinnerNotification = async (req, res) => {
  try {
    console.log("winner notification is called")

    const {id} = req.params;
    const sellerId = id
    console.log("sellerid", sellerId)
    

    const offer = await Offer.findOne({
      winner: sellerId,
      sellerPurchases: {
        $elemMatch: {
          sellerId: sellerId,
          hasSeenWin: false
        }
      }
    })
      .select("title description startDate endDate")
      .lean();
    

    console.log("offer-->",offer)
    if (!offer) {
      return res.status(200).json({
        success: true,
        show: false
      });
    }

    console.log("offer --->",offer)

    res.status(200).json({
      success: true,
      show: true,
      offer
    });

  } catch (error) {
    console.error("Winner notification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export const markWinSeen = async (req, res) => {
  try {
    const { offerId, sellerId } = req.body;

    if (!offerId) {
      return res.status(400).json({
        success: false,
        message: "offerId is required"
      });
    }

    const result = await Offer.updateOne(
      {
        _id: offerId,
        winner: sellerId,
        "sellerPurchases.sellerId": sellerId
      },
      {
        $set: {
          "sellerPurchases.$.hasSeenWin": true
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending winner notification found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Winner notification marked as seen"
    });

  } catch (error) {
    console.error("Mark win seen error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

//winner details of the user 
export const getWinningOffersForSeller = async (req, res) => {
  try {
    const sellerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const winningOffers = await Offer.find({ winner: sellerId })
      .select(
        "title description startDate endDate status products createdAt"
      )
      .populate({
        path: "products.productId",
        select: "name price imageUrl",
      })
      .populate({
        path: "winner",
        select: "name email",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: winningOffers.length,
      offers: winningOffers,
    });
  } catch (error) {
    console.error("Error fetching winning offers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch winning offers",
    });
  }
};

// winner for admin
// export const getAllOfferWinners = async (req, res) => {
//   try {
//     const offersWithWinners = await Offer.find({
//       winner: { $ne: null },
//     })
//       .select(
//         "title description startDate endDate status winner products createdAt offerFor"
//       )
//       .populate({
//         path: "winner",
//         select: "name email phone companyName",
//       })
//       .populate({
//         path: "products.productId",
//         select: "name imageUrl marketPrice dealerPrice retailerPrice packSize ",
//       })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: offersWithWinners.length,
//       offers: offersWithWinners,
//     });
//   } catch (error) {
//     console.error("Error fetching offer winners:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch offer winners",
//     });
//   }
// };

export const getAllOfferWinners = async (req, res) => {
  try {
    // 1️⃣ Fetch offers with winners
    const offersWithWinners = await Offer.find({
      winner: { $ne: null },
    })
      .select(
        "title description startDate endDate status winner products createdAt offerFor"
      )
      .populate({
        path: "winner",
        select: "name email phone companyName",
      })
      .populate({
        path: "products.productId",
        select: "name imageUrl marketPrice dealerPrice retailerPrice packSize",
      })
      .sort({ createdAt: -1 })
      .lean(); // 👈 important for modification

    // 2️⃣ Attach orders (totalAmount + items) for each offer winner
    const offersWithOrders = await Promise.all(
      offersWithWinners.map(async (offer) => {
        const orders = await Order.find({
          offerId: offer._id,
          sellerId: offer.winner?._id,
        })
          .select("items totalAmount totalQty status createdAt")
          .populate({
            path: "items.productId",
            select: "name imageUrl packSize",
          });

        return {
          ...offer,
          orders, // 👈 attached here
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: offersWithOrders.length,
      offers: offersWithOrders,
    });
  } catch (error) {
    console.error("Error fetching offer winners:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch offer winners",
    });
  }
};




