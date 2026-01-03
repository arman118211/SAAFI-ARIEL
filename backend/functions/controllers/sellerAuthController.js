import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import admin from "firebase-admin"

admin.initializeApp()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER SELLER
// export const registerSeller = async (req, res) => {
//   try {
//     const { name, email, phone, password,companyName,address } = req.body;

//     const existing = await Seller.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Seller already exists" });

//     const seller = await Seller.create({ name, email, phone,companyName,address,password});

//     res.json({
//       message: "Seller registered successfully",
//       seller,
//       token: generateToken(seller._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const registerSeller = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split("Bearer ")[1]
//     if (!token) return res.status(401).json({ message: "Unauthorized" })

//     const decoded = await admin.auth().verifyIdToken(token)

//     const { name, email, phone, password, companyName, address } = req.body

//     // Phone is already verified by Firebase
//     if (decoded.phone_number !== `+91${phone}`) {
//       return res.status(400).json({ message: "Phone mismatch" })
//     }

//     const existing = await Seller.findOne({ email })
//     if (existing) {
//       return res.status(400).json({ message: "Seller already exists" })
//     }

//     const seller = await Seller.create({
//       name,
//       email,
//       phone,
//       password,
//       companyName,
//       address,
//       phoneVerified: true,
//       firebaseUid: decoded.uid,
//     })

//     res.json({
//       message: "Seller registered successfully",
//       seller,
//       token: generateToken(seller._id),
//     })

//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
// export const registerSeller = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split("Bearer ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = await admin.auth().verifyIdToken(token);

//     const {
//       name,
//       email,
//       phone,
//       password,
//       companyName,
//       address,
//       role = "seller",
//     } = req.body;

//     // ✅ Phone verification check
//     if (decoded.phone_number !== `+91${phone}`) {
//       return res.status(400).json({ message: "Phone mismatch" });
//     }

//     // ✅ Check phone uniqueness (mandatory)
//     const phoneExists = await Seller.findOne({ phone });
//     if (phoneExists) {
//       return res.status(400).json({ message: "Phone number already registered" });
//     }

//     // ✅ Check email uniqueness ONLY if email is provided
//     if (email) {
//       const emailExists = await Seller.findOne({ email });
//       if (emailExists) {
//         return res.status(400).json({ message: "Email already registered" });
//       }
//     }

//     // ✅ Role-based approval logic
//     const isApproved = role === "dealer" ? false : true;

//     const seller = await Seller.create({
//       name,
//       email: email || null,
//       phone,
//       password,
//       companyName,
//       address,
//       role,
//       isApproved,
//     });

//     res.status(201).json({
//       message: "Seller registered successfully",
//       seller,
//       token: generateToken(seller._id),
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const registerSeller = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      companyName,
      address,
      role = "seller",
    } = req.body;

    // 🔒 Basic validation
    if (!name || !phone || !password || !companyName || !address) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // ✅ Check phone uniqueness (MANDATORY)
    const phoneExists = await Seller.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    // ✅ Check email uniqueness (ONLY if provided)
    if (email) {
      const emailExists = await Seller.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
    }

    // ✅ Dealer approval logic
    const isApproved = role === "dealer" ? false : true;

    // ✅ Create seller
    const seller = await Seller.create({
      name,
      email: email || null,
      phone,
      password, // ⚠️ make sure password hashing middleware exists
      companyName,
      address,
      role,
      isApproved,
    });

    // ✅ Send response
    res.status(201).json({
      message: "Seller registered successfully",
      seller,
      token: generateToken(seller._id),
    });

  } catch (error) {
    console.error("Register Seller Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// LOGIN SELLER
// export const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const seller = await Seller.findOne({ email });
//     if (!seller) return res.status(400).json({ message: "Seller not found" });

//     const isMatch = await seller.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

//     res.json({
//       message: "Login successful",
//       seller,
//       token: generateToken(seller._id),
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const loginSeller = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // identifier = email OR phone

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Find by email OR phone
    const seller = await Seller.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // 🚫 Block unapproved users (e.g. dealers)
    if (!seller.isApproved) {
      return res.status(403).json({
        message: "Your account is pending approval . Please try after some time or contact to the admin for quick Approval.",
      });
    }

    // 🔑 Password check
    const isMatch = await seller.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      seller,
      token: generateToken(seller._id),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


//get all seller
// export const getAllseller = async (req, res) => {
//   try {

//     const sellers = await Seller.find({role:"seller"}).select("-password").lean();

//     const finalResponse = await Promise.all(
//       sellers.map(async (seller) => {
//         const orders = await Order.find({ sellerId: seller._id })
//           .lean();

//         // Process each order
//         const populatedOrders = await Promise.all(
//           orders.map(async (order) => {
//             const updatedItems = await Promise.all(
//               order.items.map(async (item) => {
//                 const product = await Product.findById(item.productId)
//                   .select("name imageUrl")
//                   .lean();

//                 return {
//                   ...item,
//                   product: product ? {
//                     name: product.name,
//                     imageUrl: product.imageUrl
//                   } : null
//                 };
//               })
//             );

//             return {
//               ...order,
//               items: updatedItems
//             };
//           })
//         );

//         return {
//           ...seller,
//           orders: populatedOrders
//         };
//       })
//     );

//     res.json({
//       message: "Seller with orders & product details",
//       data: finalResponse,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

export const getAllseller = async (req, res) => {
  try {
    console.log("api is calling -->")
    const { role } = req.body; // seller | retailer | dealer

    // ✅ Validate role
    const allowedRoles = ["seller", "retailer", "dealer"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ✅ Build query dynamically
    const query = role ? { role } : {};

    const sellers = await Seller.find(query)
      .select("-password")
      .lean();

    const finalResponse = await Promise.all(
      sellers.map(async (seller) => {
        const orders = await Order.find({ sellerId: seller._id }).lean();

        const populatedOrders = await Promise.all(
          orders.map(async (order) => {
            const updatedItems = await Promise.all(
              order.items.map(async (item) => {
                const product = await Product.findById(item.productId)
                  .select("name imageUrl packSize quantity")
                  .lean();

                return {
                  ...item,
                  product: product
                    ? {
                        packSize:product.packSize,
                        quantity:product.quantity,
                        name: product.name,
                        imageUrl: product.imageUrl,
                      }
                    : null,
                };
              })
            );

            return {
              ...order,
              items: updatedItems,
            };
          })
        );

        return {
          ...seller,
          orders: populatedOrders,
        };
      })
    );

    res.json({
      message: `List of ${role || "all"} users with orders`,
      data: finalResponse,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

//update the isApproved for the delear

export const updateSellerApproval = async (req, res) => {
  try {
    const { sellerId, isApproved } = req.body;

    // ✅ Basic validation
    if (!sellerId || typeof isApproved !== "boolean") {
      return res.status(400).json({
        message: "sellerId and isApproved (boolean) are required",
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.isApproved = isApproved;
    await seller.save();

    res.status(200).json({
      message: `Seller ${isApproved ? "approved" : "disapproved"} successfully`,
      data: {
        _id: seller._id,
        name: seller.name,
        role: seller.role,
        isApproved: seller.isApproved,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



export const updateSellerProfile = async (req, res) => {
  try {
   
    const { name, address, currentPassword, newPassword,id } = req.body;
     console.log("user-->",id)
    const sellerId = id; // from auth middleware

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


