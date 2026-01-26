import RewardBadge from "../models/RewardBadge.js";

/**
 * ✅ Create new reward badge (Admin)
 */
export const createRewardBadge = async (req, res) => {
  try {
    const badge = await RewardBadge.create(req.body);

    res.status(201).json({
      success: true,
      message: "Reward badge created successfully",
      data: badge,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get all ACTIVE & VALID badges (User / Modal)
 */
export const getActiveBadges = async (req, res) => {
  try {
    const today = new Date();

    const badges = await RewardBadge.find({
      isActive: true,
      validFrom: { $lte: today },
      validTill: { $gte: today },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Calculate reward (Modal scratch / spin)
 */
export const calculateReward = async (req, res) => {
  try {
    const { badgeId, purchasedQty } = req.body;

    if (!badgeId || !purchasedQty) {
      return res.status(400).json({
        success: false,
        message: "badgeId and purchasedQty are required",
      });
    }

    const badge = await RewardBadge.findOne({
      _id: badgeId,
      isActive: true,
      validFrom: { $lte: new Date() },
      validTill: { $gte: new Date() },
    });

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Reward badge not available or expired",
      });
    }

    if (purchasedQty < badge.minPurchaseQty) {
      return res.status(400).json({
        success: false,
        message: `Minimum ${badge.minPurchaseQty} quantity required`,
      });
    }

    const rewardAmount =
      Math.floor(
        Math.random() *
          (badge.rewardMaxAmount - badge.rewardMinAmount + 1)
      ) + badge.rewardMinAmount;

    res.status(200).json({
      success: true,
      message: "Congratulations! 🎉",
      rewardType: badge.rewardType,
      rewardAmount,
      badgeTitle: badge.title,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Get ALL badges (Admin)
 */
export const getAllBadgesForAdmin = async (req, res) => {
  try {
    const badges = await RewardBadge.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Update badge (Admin)
 */
export const updateRewardBadge = async (req, res) => {
  try {
    const { id } = req.params;

    const badge = await RewardBadge.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Reward badge not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reward badge updated successfully",
      data: badge,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ Delete badge (Admin)
 */
export const deleteRewardBadge = async (req, res) => {
  try {
    const { id } = req.params;

    const badge = await RewardBadge.findByIdAndDelete(id);

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Reward badge not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reward badge deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
