import Order from "../models/Order.js";
import Offer from "../models/Offer.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    console.log("create api called")
    const { sellerId, items, offerId } = req.body;
    console.log({ sellerId, items, offerId })

    // calculate totalQty & totalAmount
    let totalQty = 0;
    let totalAmount = 0;

    items.forEach((item) => {
      totalQty += item.qty;
      totalAmount += item.qty * item.price;
    });

    const order = await Order.create({
      sellerId,
      items,
      totalQty,
      totalAmount,
      offerId: offerId || null,
    });

    // OFFER INTEGRATION
    if (offerId) {
      const offer = await Offer.findById(offerId);

      if (offer) {
        // check if seller exists in offer
        let sellerEntry = offer.sellerPurchases.find(
          (sp) => sp.sellerId.toString() === sellerId
        );

        if (sellerEntry) {
          sellerEntry.totalQty += totalQty;
          sellerEntry.orders.push({
            orderId: order._id,
            qty: totalQty,
          });
        } else {
          offer.sellerPurchases.push({
            sellerId,
            totalQty,
            orders: [{ orderId: order._id, qty: totalQty }],
          });
        }

        await offer.save();
      }
    }

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ORDERS (ADMIN)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("sellerId")
      .populate("items.productId")
      .populate("offerId");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE ORDER
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("sellerId")
      .populate("items.productId")
      .populate("offerId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ORDERS BY SELLER
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.sellerId })
      .populate("items.productId")
      .populate("offerId");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log("status", status)

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
