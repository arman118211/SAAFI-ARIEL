import Offer from "../models/Offer.js";
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
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("products.productId")
      .populate("sellerPurchases.sellerId")
      .populate("winner");

    if (!offer) return res.status(404).json({ message: "Offer not found" });

    res.json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
        select: "name price unit imageUrl category stock",
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
export const getActiveOffers = async (req, res) => {
  try {
    const now = new Date();

    const offers = await Offer.find({
      endDate: { $gte: now },          // not crossed deadline
      status: { $ne: "closed" },       // not closed
    })
      .select("-winner")               // exclude winner field
      .populate("products.productId") // optional
      .populate("sellerPurchases.sellerId");        // optional

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


