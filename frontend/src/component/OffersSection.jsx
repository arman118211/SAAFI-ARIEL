import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Zap,
	Clock,
	ArrowRight,
	Calendar,
	Trophy,
	Sparkles,
	Gift,
	Flame,
	Bell,
} from "lucide-react";

const TimerUnit = ({ value, label }) => (
	<div className="flex flex-col items-center px-2 sm:px-3">
		<span className="text-xl md:text-2xl font-black text-slate-900 tabular-nums leading-none">
			{String(value).padStart(2, "0")}
		</span>
		<span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
			{label}
		</span>
	</div>
);

const OfferSkeleton = () => {
	return (
		<div className="relative bg-white border border-slate-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm">
			{/* Progress bar */}
			<div className="h-1.5 w-full shimmer" />

			<div className="flex flex-col lg:flex-row">
				{/* Left Panel */}
				<div className="lg:w-[35%] p-8 md:p-12 bg-slate-300 shimmer">
					<div className="w-12 h-12 rounded-xl bg-slate-400 mb-6 shimmer" />
					<div className="h-20 w-24 rounded-lg bg-slate-400 mb-3 shimmer" />
					<div className="h-4 w-32 rounded bg-slate-400 shimmer" />
				</div>

				{/* Right Panel */}
				<div className="lg:w-[65%] p-6 md:p-12 space-y-6">
					<div className="h-6 w-40 rounded-full shimmer" />

					<div className="h-10 w-3/4 rounded-xl shimmer" />

					<div className="space-y-3">
						<div className="h-4 w-full rounded shimmer" />
						<div className="h-4 w-5/6 rounded shimmer" />
						<div className="h-4 w-2/3 rounded shimmer" />
					</div>

					<div className="flex items-center justify-between pt-6 border-t border-slate-100">
						<div className="flex gap-2">
							<div className="h-10 w-10 rounded-xl shimmer" />
							<div className="flex gap-2">
								<div className="h-10 w-12 rounded shimmer" />
								<div className="h-10 w-12 rounded shimmer" />
								<div className="h-10 w-12 rounded shimmer" />
							</div>
						</div>

						<div className="h-12 w-40 rounded-2xl shimmer" />
					</div>
				</div>
			</div>
		</div>
	);
};

const ProfessionalOffersPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { seller } = useSelector((state) => state.auth);

	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [timers, setTimers] = useState({});

	const getData = async () => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/offers/activeOffer`,
				{
					role: seller?.role || "common",
				}
			);
			setOffers(res.data.offers || []);
		} catch (error) {
			console.error("API Error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [seller?.role]);

	useEffect(() => {
		if (offers.length === 0) return;
		const calculateTime = () => {
			const updatedTimers = {};
			offers.forEach((offer) => {
				const now = new Date().getTime();
				const end = new Date(offer.endDate).getTime();
				const start = new Date(offer.createdAt).getTime();
				const remaining = end - now;
				const totalDuration = end - start;
				const progress = Math.min(
					Math.max(((now - start) / totalDuration) * 100, 0),
					100
				);

				updatedTimers[offer._id] = {
					hours: Math.max(0, Math.floor(remaining / (1000 * 60 * 60))),
					minutes: Math.max(0, Math.floor((remaining / 1000 / 60) % 60)),
					seconds: Math.max(0, Math.floor((remaining / 1000) % 60)),
					progress,
				};
			});
			setTimers(updatedTimers);
		};
		const interval = setInterval(calculateTime, 1000);
		calculateTime();
		return () => clearInterval(interval);
	}, [offers]);

	if (!loading && offers.length === 0) {
		return;
	}

	return (
		<section className="py-8 md:py-16 px-4  bg-gray-200">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				{!loading &&
					offers.length > 0 &&
					location.pathname !== "/dashboard" && (
						<div className="text-center mb-10 md:mb-16">
							<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs md:text-sm font-bold mb-4">
								<Sparkles className="w-4 h-4" /> EXCLUSIVE REWARDS
							</div>
							<h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
								Active <span className="text-blue-600">Offers</span>
							</h2>
						</div>
					)}

				{/* Offers List */}
				<div className="space-y-8 md:space-y-12">
					{loading ? (
						<div className="space-y-8 md:space-y-12">
							{[...Array(3)].map((_, i) => (
								<OfferSkeleton key={i} />
							))}
						</div>
					) : (
						offers.map((offer) => {
							const time = timers[offer._id] || {
								hours: 0,
								minutes: 0,
								seconds: 0,
								progress: 0,
							};

							return (
								<Link
									to={`/offers/${offer._id}`}
									key={offer._id}
									className="block group relative bg-white border border-slate-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
								>
									{/* Urgency Progress Bar */}
									<div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-20">
										<div
											className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000"
											style={{ width: `${time.progress}%` }}
										/>
									</div>

									<div className="flex flex-col lg:flex-row">
										{/* Left Panel - Visual Anchor */}
										<div className="lg:w-[35%] bg-gradient-to-br from-blue-700 to-indigo-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
											<div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />

											<div className="relative z-10">
												<div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
													<Zap className="w-6 h-6 text-white" />
												</div>
												<h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-2">
													{offer.products?.length || 0}
												</h2>
												<p className="text-sm md:text-xl font-bold opacity-90 uppercase tracking-widest">
													Items Bundled
												</p>
											</div>

											<div className="relative z-10 mt-6 flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70">
												<Calendar className="w-4 h-4" />
												ENDS: {new Date(offer.endDate).toLocaleDateString()}
											</div>
										</div>

										{/* Right Panel - Content */}
										<div className="lg:w-[65%] p-6 md:p-12 flex flex-col justify-center bg-white">
											<div className="mb-8">
												<div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
													<Flame className="w-3 h-3" /> Live Offer
												</div>
												<h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
													{offer.title}
												</h3>

												<div className="relative p-5 md:p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100">
													<p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium line-clamp-2 md:line-clamp-3">
														{offer.description}
													</p>
												</div>
											</div>

											{/* Bottom Section */}
											<div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
												{/* Timer */}
												<div className="flex items-center gap-3">
													<div className="bg-slate-900 p-2 md:p-3 rounded-xl">
														<Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
													</div>
													<div className="flex divide-x divide-slate-200">
														<TimerUnit value={time.hours} label="Hrs" />
														<TimerUnit value={time.minutes} label="Min" />
														<TimerUnit value={time.seconds} label="Sec" />
													</div>
												</div>

												{/* CTA Button (Now styled as a div since parent is a Link) */}
												<div className="w-full sm:w-auto bg-slate-900 text-white px-8 md:px-10 py-4 rounded-2xl font-black group-hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200">
													VIEW DETAILS
													<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
												</div>
											</div>
										</div>
									</div>
								</Link>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
};

export default ProfessionalOffersPage;
