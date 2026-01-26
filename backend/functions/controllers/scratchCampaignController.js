import ScratchCampaign from "../models/ScratchCampaign.js";


export const createScratchCampaign = async (req, res) => {
	try {
		const {
			title,
			minAmount,
			maxAmount,
			winningAmount,
		} = req.body;

		if (
			!title ||
			minAmount == null ||
			maxAmount == null ||
			winningAmount == null
		) {
			return res
				.status(400)
				.json({ message: "All fields are required" });
		}

		const campaign = await ScratchCampaign.create({
			title,
			minAmount,
			maxAmount,
			winningAmount,
			isLive: true,
		});

		return res.status(201).json({
			success: true,
			message: "Scratch campaign created",
			data: campaign,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}
};

export const updateScratchCampaign = async (req, res) => {
	try {
		const { id } = req.params;

		const campaign = await ScratchCampaign.findById(id);

		if (!campaign) {
			return res
				.status(404)
				.json({ message: "Campaign not found" });
		}

		const updatedCampaign =
			await ScratchCampaign.findByIdAndUpdate(
				id,
				req.body,
				{ new: true, runValidators: true }
			);

		return res.json({
			success: true,
			message: "Campaign updated",
			data: updatedCampaign,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}
};


export const scratchCampaign = async (req, res) => {
	try {
		const { campaignId } = req.body;

		const campaign = await ScratchCampaign.findOne({
			_id: campaignId,
			isLive: true,
		});

		if (!campaign) {
			return res.status(400).json({
				message:
					"Scratch not available or already used",
			});
		}

		// 🔐 mark campaign as used
		campaign.isLive = false;
		await campaign.save();

		return res.json({
			success: true,
			wonAmount: campaign.winningAmount,
			message: "Scratch successful",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}
};


export const getLiveCampaigns = async (req, res) => {
	try {
        
		const campaigns = await ScratchCampaign.find({
			isLive: true,
		});

		return res.json({
			success: true,
			data: campaigns,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}
};

export const getScratchCampaignById = async (req, res) => {
	try {
		const { scratchCouponId } = req.params;

		// validate mongo id
		if (!scratchCouponId) {
			return res
				.status(400)
				.json({ message: "Campaign ID is required" });
		}

		const campaign = await ScratchCampaign.findById(
			scratchCouponId
		).select(
			"title minAmount maxAmount isLive createdAt"
		);

		if (!campaign) {
			return res.status(404).json({
				message: "Scratch campaign not found",
			});
		}

		return res.json({
			success: true,
			data: campaign,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}
};

