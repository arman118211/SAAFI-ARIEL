import React, { useEffect } from "react";
import {
	CheckCircle2,
	ArrowLeft,
	CreditCard,
	MapPin,
	Receipt,
	ChevronRight,
	Download,
	Box,
	Truck,
	Clock,
	ExternalLink,
	Phone,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { generateInvoice } from "../../utils/generateInvoice";


export default function OrderDetailPage() {
	const { state } = useLocation();
	const navigate = useNavigate();

	const [orderData, setOrderData] = useState(state?.order);
	const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
	const [updatingStatus, setUpdatingStatus] = useState(null);

	

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth", // remove this line if you want instant scroll
		});
	}, []);

	useEffect(() => {
		if (!orderData) {
			navigate("/dashboard");
		}
	}, [orderData, navigate]);

	if (!orderData) return null;

	const subtotal = orderData.items.reduce((sum, item) => {
		return sum + item.qty * item.productId.packSize * item.price;
	}, 0);

	const savings = subtotal - orderData.totalAmount;

	const { seller } = useSelector((state) => state.auth);
	const isAdmin = seller?.role === "admin";

	
	const TIMELINE_STATUSES = ["pending", "confirmed", "delivered"];

	// ✅ Admin menu should include cancelled
	const ALL_STATUSES = ["pending", "confirmed", "delivered", "cancelled"];

	// const currentIndex = Math.max(0, ORDER_STATUSES.indexOf(orderData.status));
	const currentIndex = Math.max(0, TIMELINE_STATUSES.indexOf(orderData.status));

	const STATUS_LABELS = {
		pending: "Placed",
		confirmed: "Confirmed",
		delivered: "Delivered",
		cancelled: "Cancelled",
	};

	const STATUS_ICONS = {
		pending: Box,
		confirmed: Clock,
		delivered: CheckCircle2,
		cancelled: Truck,
	};

	const handleStatusUpdate = async (newStatus) => {
		if (!isAdmin || newStatus === orderData.status) return;
		

		try {
			setIsUpdatingStatus(true);
			setUpdatingStatus(newStatus);

			await axios.put(
				`${import.meta.env.VITE_BASE_URL}/order/status/${orderData._id}`,
				{
					status: newStatus,
				}
			);
			toast.success(`Order marked as ${newStatus}`);

			// ✅ Update local state (triggers re-render)
			setOrderData((prev) => ({
				...prev,
				status: newStatus,
			}));
		} catch (err) {
			console.error("Status update failed", err);
			toast.error("Failed to update order status");
		} finally {
			setIsUpdatingStatus(false);
			setUpdatingStatus(null);
		}
	};

	const isCancelled = orderData.status === "cancelled";

	return (
		<div className="min-h-screen  bg-[#FDFDFF]  text-slate-900">
			{/* Desktop Header / Mobile Sticky Nav */}
			<nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 md:py-6">
				<div className=" mx-auto flex items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							onClick={() => navigate(-1)}
							className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors md:hidden"
						>
							<ArrowLeft size={20} />
						</button>
						<button
							onClick={() => navigate(-1)}
							className="hidden md:flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all"
						>
							<ArrowLeft size={18} /> Back
						</button>
						<div className="md:ml-4">
							<h1 className="text-sm md:text-2xl font-black tracking-tight">
								Order{" "}
								<span className="text-indigo-600">
									#{orderData._id.slice(-6)}
								</span>
							</h1>
							<p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">
								{new Date(orderData.createdAt).toDateString()}
							</p>
						</div>
					</div>
					<div className="flex gap-2">
						<button 
            onClick={() => generateInvoice(orderData, seller)}
            className="p-2 md:px-4 md:py-2 md:border md:border-slate-200 md:rounded-xl md:text-sm md:font-bold md:flex md:items-center md:gap-2">
							<Download size={18} className="text-slate-600" />
							<span className="hidden md:inline">Invoice</span>
						</button>
					</div>
				</div>
			</nav>

			<main className=" mx-auto p-4 md:p-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
					{/* Left Column: Timeline & Items */}
					<div className="lg:col-span-8 space-y-6">
						{/* Timeline Card - Compact for Mobile, Wide for Desktop */}
						{/* Timeline OR Cancelled Message */}
						{!isCancelled ? (
							/* 🟢 NORMAL TIMELINE */
							<div className="flex items-center justify-between relative px-2 md:px-10 overflow-hidden ">
								<div className="absolute top-4 md:top-5 left-8 right-8 h-[2px] bg-slate-100" />

								<div
									className="absolute top-4 md:top-5 left-8 h-[2px] bg-indigo-600 transition-all"
									style={{
										width: `${
											(currentIndex / (TIMELINE_STATUSES.length - 1)) * 100
										}%`,
									}}
								/>

								{TIMELINE_STATUSES.map((status, index) => {
									const active = index <= currentIndex;
									const Icon = STATUS_ICONS[status];

									return (
										<div
											key={status}
											className="relative z-10 flex flex-col items-center"
										>
											<div
												className={`w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-sm ${
													active
														? "bg-indigo-600 text-white"
														: "bg-white text-slate-300 border"
												}`}
											>
												<Icon size={14} />
											</div>

											<span
												className={`mt-3 text-[9px] md:text-[11px] font-black uppercase ${
													active ? "text-indigo-600" : "text-slate-300"
												}`}
											>
												{STATUS_LABELS[status]}
											</span>
										</div>
									);
								})}
							</div>
						) : (
							/* 🔴 CANCELLED MESSAGE */
							<div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
								<div className="flex justify-center mb-3">
									<Truck className="w-10 h-10 text-red-600" />
								</div>

								<h3 className="text-lg md:text-xl font-black text-red-700">
									Order Cancelled
								</h3>

								<p className="text-sm text-red-600 mt-1">
									This order has been cancelled and will not be processed
									further.
								</p>
							</div>
						)}

						{isAdmin && orderData.status !== "cancelled" && (
							<div className="bg-white rounded-2xl p-4 border border-slate-100">
								<h4 className="text-xs font-black uppercase text-slate-500 mb-3">
									Update Order Status
								</h4>

								<div className="flex flex-wrap gap-2 ">
									{ALL_STATUSES.map((status) => {
										const isCurrent = status === orderData.status;

										return (
											<button
												key={status}
												disabled={isUpdatingStatus || isCurrent}
												onClick={() => handleStatusUpdate(status)}
												className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-2  ${
													isCurrent
														? "bg-slate-100 text-slate-400 cursor-not-allowed"
														: isUpdatingStatus
														? "bg-indigo-400 text-white cursor-wait"
														: "bg-indigo-600 text-white hover:bg-indigo-700"
												}`}
											>
												{updatingStatus === status && (
													<Loader2 className="w-4 h-4 animate-spin" />
												)}

												{status}
											</button>
										);
									})}
								</div>
							</div>
						)}

						{/* Product List - Row Wise (Mobile and Desktop) */}
						<div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
							<div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
								<h3 className="font-black text-slate-800 text-xs md:text-sm uppercase tracking-wider">
									Package Items
								</h3>
								<span className="text-[10px] font-bold text-slate-400">
									{orderData.items.length} TOTAL
								</span>
							</div>
							<div className="divide-y divide-slate-50">
								{/* {products.map((item) => (
									<div
										key={item.id}
										className="p-4 md:p-6 flex items-center gap-4 md:gap-6 group hover:bg-slate-50 transition-colors"
									>
										<div className="relative flex-shrink-0">
											<img
												src={item.image}
												className="w-14 h-14 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm"
												alt=""
											/>
											<div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-lg border-2 border-white">
												{item.quantity}
											</div>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="font-bold text-slate-900 text-xs md:text-base truncate group-hover:text-indigo-600 transition-colors">
												{item.name}
											</h4>
											<p className="text-[10px] md:text-xs text-slate-400 font-medium mt-0.5 md:mt-1 tracking-tight uppercase">
												SKU: 882-0{item.id}
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm md:text-xl font-black text-slate-900 leading-none">
												${item.price}
											</p>
										</div>
									</div>
								))} */}
								{orderData.items.map((item) => {
									const basePrice =
										item.qty * item.productId.packSize * item.price;

									const finalPrice =
										item.discount > 0
											? basePrice - (basePrice * item.discount) / 100
											: basePrice;

									return (
										<div
											key={item._id}
											className="p-4 md:p-6 flex items-center gap-4 hover:bg-slate-50"
										>
											<div className="relative">
												<img
													src={item.productId.imageUrl}
													className="w-14 h-14 md:w-20 md:h-20 rounded-2xl object-contain bg-white"
													alt={item.productId.name}
												/>
												<div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-black h-5 w-5 flex items-center justify-center rounded-lg">
													{item.qty}
												</div>
											</div>

											<div className="flex-1 min-w-0">
												<h4 className="font-bold text-xs md:text-base truncate">
													{item.productId.name} {item.productId.quantity}
												</h4>
												<p className="text-[10px] md:text-xs text-slate-400">
													{item.productId.quantity} • {item.productId.packSize}{" "}
													pcs
												</p>
											</div>

											<div className="text-right">
												{item.discount > 0 && (
													<>
														<p className="text-xs text-gray-400 line-through">
															₹{basePrice}
														</p>

														<p className="text-xs text-green-600 font-bold">
															 ({item.discount}%
															OFF)
														</p>
													</>
												)}
												<p className="text-sm md:text-xl font-black text-indigo-600">
													₹{finalPrice}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Details Grid */}
						<div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
							<div className="bg-indigo-50/30 rounded-3xl p-5 border border-indigo-100/50">
								<MapPin size={16} className="text-indigo-500 mb-3" />
								<h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">
									Shipping
								</h4>
								<p className="font-black text-slate-800 text-sm md:text-md">
									{orderData.sellerId.name || seller.name}
								</p>
								<p className="text-slate-600 text-[12px] md:text-md mt-0.5 leading-tight">
									{orderData.sellerId.address || seller.address}
								</p>
								<p className="text-slate-600 text-[10px] md:text-xs mt-0.5 leading-tight">
									📞 {orderData.sellerId.phone || seller.phone}
								</p>
							</div>
							<div className="bg-pink-50/30 rounded-3xl p-5 border border-pink-100/50">
								<CreditCard size={16} className="text-pink-500 mb-3" />
								<h4 className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1">
									Cash / Wallet
								</h4>
								<p className="font-black text-slate-800 text-xs md:text-sm">
									{orderData.status}
								</p>
								<p className="text-slate-600 text-[10px] md:text-xs mt-0.5 leading-tight uppercase font-bold tracking-tighter italic">
									Authorized
								</p>
							</div>
						</div>
					</div>

					{/* Right Column: Summary (Sticky on Desktop) */}
					<div className="lg:col-span-4 lg:sticky lg:top-24">
						<div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl shadow-indigo-200">
							<div className="flex items-center gap-3 mb-8">
								<Receipt size={20} className="text-indigo-200" />
								<h3 className="text-lg font-black tracking-tight">Summary</h3>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between text-indigo-100/70 text-xs font-bold uppercase tracking-wider">
									<span>Subtotal</span>
									<span className="text-white font-black ">₹{subtotal}</span>
								</div>
								<div className="flex justify-between text-indigo-100/70 text-xs font-bold uppercase tracking-wider">
									<span>Logistics</span>
									<span className="text-emerald-300 font-black tracking-tighter">
										FREE
									</span>
								</div>
								<div className="flex justify-between text-indigo-100/70 text-xs font-bold uppercase tracking-wider">
									<span>Savings</span>
									<span className="text-emerald-300 font-black">
										-₹{savings}
									</span>
								</div>

								<div className="pt-6 mt-4 border-t border-white/10 flex justify-between items-end">
									<div>
										<p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-1">
											Grand Total
										</p>
										<p className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
											₹{orderData.totalAmount}
										</p>
									</div>
									{/* <button className="bg-white text-indigo-600 font-black px-5 py-3 rounded-2xl text-xs hover:bg-indigo-50 active:scale-95 transition-all shadow-lg shadow-indigo-900/20">
										Reorder
									</button> */}
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-between px-4">
							<button className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 flex items-center gap-2">
								<Phone size={14} /> Support
							</button>
							<button className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 flex items-center gap-2">
								Policy <ExternalLink size={12} />
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
