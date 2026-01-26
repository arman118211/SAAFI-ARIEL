import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../../public/lottie/coin.json";
import celebrationAnimation from "../../../public/lottie/celebrations.json";

const ScratchCouponPage = () => {
	const { scratchCouponId } = useParams();
	const [loading, setLoading] = useState(true);
	const [campaign, setCampaign] = useState(null);
	const [wonAmount, setWonAmount] = useState(null);
	const [error, setError] = useState("");
	const [showLoader, setShowLoader] = useState(false);
	const [showCelebration, setShowCelebration] = useState(false);
	const [isScratched, setIsScratched] = useState(false);

	const canvasRef = useRef(null);

	const fetchCampaign = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/sth/${scratchCouponId}`,
			);
			setCampaign(res.data.data);
			if (!res.data.data.isLive) {
				setWonAmount(res.data.data.wonAmount || "Used");
				setIsScratched(true);
			}
		} catch (err) {
			setError("Invalid or expired coupon");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCampaign();
	}, [scratchCouponId]);

	useEffect(() => {
		if (!loading && !isScratched && canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			canvas.width = 300;
			canvas.height = 180;

			// Professional Silver-Silk Finish
			const grad = ctx.createLinearGradient(0, 0, 300, 180);
			grad.addColorStop(0, "#E2E8F0"); // slate-200
			grad.addColorStop(0.5, "#F8FAFC"); // slate-50
			grad.addColorStop(1, "#CBD5E1"); // slate-300

			ctx.fillStyle = grad;
			ctx.roundRect
				? ctx.roundRect(0, 0, 300, 180, 16)
				: ctx.rect(0, 0, 300, 180);
			ctx.fill();

			// Subtle Pattern Overlay
			ctx.globalAlpha = 0.05;
			for (let i = 0; i < 300; i += 10) {
				ctx.beginPath();
				ctx.moveTo(i, 0);
				ctx.lineTo(i, 180);
				ctx.stroke();
			}
			ctx.globalAlpha = 1.0;

			ctx.font = "600 14px Inter, sans-serif";
			ctx.fillStyle = "#64748B";
			ctx.textAlign = "center";
			ctx.fillText("Gently scratch to reveal", 150, 95);
		}
	}, [loading, isScratched]);

	const handleScratchAction = async () => {
		if (showLoader || wonAmount) return;
		setShowLoader(true);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/sth/scratch`,
				{
					campaignId: scratchCouponId,
				},
			);
			setTimeout(() => {
				setShowLoader(false);
				setWonAmount(res.data.wonAmount);
				setShowCelebration(true);
			}, 3000);
		} catch (err) {
			setShowLoader(false);
			alert("Unable to process claim");
		}
	};

	const scratch = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		const rect = canvas.getBoundingClientRect();
		const x = (e.clientX || e.touches[0].clientX) - rect.left;
		const y = (e.clientY || e.touches[0].clientY) - rect.top;

		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(x, y, 22, 0, Math.PI * 2);
		ctx.fill();

		if (!showLoader && !wonAmount) handleScratchAction();
	};

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center bg-gray-50">
				<div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	return (
		<div className="h-screen flex items-center justify-center bg-[#F9FAFB] p-6 font-sans">
			<div className="relative w-full max-w-[360px]">
				{/* Clean Professional Card */}
				<div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
					{/* Top Branding Section */}
					<div className="pt-10 pb-6 text-center">
						<div className="flex justify-center mb-4">
							<div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
								<span className="text-2xl">🎁</span>
							</div>
						</div>
						<h2 className="text-xl font-bold text-gray-800 tracking-tight">
							{campaign?.title}
						</h2>
						<p className="text-sm text-gray-400 mt-1">
							Cashback Reward Program
						</p>
					</div>

					{/* The Reveal Container */}
					<div
						className={`relative mx-6 mb-10 h-[180px] rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100
		${showLoader ? "bg-white" : "bg-[#F1F5F9]"}
	`}
					>
						{/* Background Celebration (Behind Prize) */}
						{showCelebration && (
							<div className="absolute inset-0 z-0 opacity-60">
								<Lottie
									animationData={celebrationAnimation}
									loop={true}
									className="w-full h-full scale-110"
								/>
							</div>
						)}

						{/* Content Layer */}
						<div className="z-10 text-center">
							{showLoader ? (
								<div className="w-full h-full flex items-center justify-center ">
									<Lottie
										animationData={loaderAnimation}
										loop
										style={{ width: "100%", height: "100%" }}
									/>
								</div>
							) : (
								wonAmount && (
									<div className="animate-in fade-in zoom-in duration-700">
										<p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
											Total Won
										</p>
										<h3 className="text-5xl font-extrabold text-gray-900">
											{wonAmount}
										</h3>
										<div className="mt-4 px-4 py-1.5 bg-green-50 text-green-600 text-[11px] font-semibold rounded-full inline-flex items-center gap-1">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
											Settled to Balance
										</div>
									</div>
								)
							)}
						</div>

						{/* Scratch Cover (Top) */}
						{!isScratched && (
							<canvas
								ref={canvasRef}
								onMouseMove={(e) => e.buttons === 1 && scratch(e)}
								onTouchMove={scratch}
								className="absolute inset-0 z-20 cursor-pointer touch-none transition-opacity"
							/>
						)}
					</div>

					{/* Footer / Instructions */}
					<div className="bg-gray-50/50 px-8 py-6 border-t border-gray-100">
						<div className="flex items-center justify-between opacity-60">
							<div className="text-[10px] font-mono text-gray-500">
								REF: {scratchCouponId?.slice(0, 8).toUpperCase()}
							</div>
							<div className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter italic">
								Verified Secure
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Decorator Shadow */}
				<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-gray-200/30 blur-xl rounded-full -z-10"></div>
			</div>
		</div>
	);
};

export default ScratchCouponPage;
