import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER SELLER
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Seller already exists" });

    const seller = await Seller.create({ name, email, phone, password});

    res.json({
      message: "Seller registered successfully",
      seller,
      token: generateToken(seller._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN SELLER
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "Seller not found" });

    const isMatch = await seller.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

    res.json({
      message: "Login successful",
      seller,
      token: generateToken(seller._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all seller
export const getAllseller = async (req, res) => {
  try {

    const sellers = await Seller.find({role:"seller"}).select("-password").lean();

    const finalResponse = await Promise.all(
      sellers.map(async (seller) => {
        const orders = await Order.find({ sellerId: seller._id })
          .lean();

        // Process each order
        const populatedOrders = await Promise.all(
          orders.map(async (order) => {
            const updatedItems = await Promise.all(
              order.items.map(async (item) => {
                const product = await Product.findById(item.productId)
                  .select("name imageUrl")
                  .lean();

                return {
                  ...item,
                  product: product ? {
                    name: product.name,
                    imageUrl: product.imageUrl
                  } : null
                };
              })
            );

            return {
              ...order,
              items: updatedItems
            };
          })
        );

        return {
          ...seller,
          orders: populatedOrders
        };
      })
    );

    res.json({
      message: "Seller with orders & product details",
      data: finalResponse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateSellerProfile = async (req, res) => {
  try {
    const sellerId = req.user._id; // from auth middleware
    const { name, address, currentPassword, newPassword } = req.body;

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Update name & address
    if (name) seller.name = name;
    if (address) seller.address = address;

    // 🔐 Password update flow
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Both currentPassword and newPassword are required",
        });
      }

      const isMatch = await seller.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({
          message: "Current password is incorrect",
        });
      }

      seller.password = newPassword; // auto-hashed via pre-save hook
    }

    await seller.save();

    res.status(200).json({
      message: "Profile updated successfully",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        role: seller.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


