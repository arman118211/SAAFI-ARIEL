import mongoose from "mongoose";

const scratchCampaignSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		minAmount: {
			type: Number,
			required: true,
		},

		maxAmount: {
			type: Number,
			required: true,
		},

		winningAmount: {
			type: Number,
			required: true,
		},

		isLive: {
			type: Boolean,
			default: true, // 👈 default live
		},
	},
	{ timestamps: true }
);

// validation
scratchCampaignSchema.pre("save", function (next) {
	if (
		this.winningAmount < this.minAmount ||
		this.winningAmount > this.maxAmount
	) {
		return next(
			new Error("Winning amount must be within range")
		);
	}
	next();
});

export default mongoose.model(
	"ScratchCampaign",
	scratchCampaignSchema
);
