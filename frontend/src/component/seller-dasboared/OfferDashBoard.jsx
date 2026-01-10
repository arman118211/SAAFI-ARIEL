import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    Calendar,
    Gift,
    ShoppingBag,
    ArrowRight,
    Tag,
    Clock,
    Medal,
    Sparkles,
    ChevronRight,
    BadgePercent
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

// --- SUB-COMPONENT: COUNTDOWN TIMER ---
const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const parts = Object.entries(timeLeft);
    if (parts.length === 0) return <span className="text-red-500 font-bold text-xs uppercase">Offer Ended</span>;

    return (
        <div className="flex items-center gap-2 bg-indigo-50/50 px-3 py-1.5 rounded-full border border-indigo-100">
            <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <div className="flex gap-2">
                {parts.map(([label, value]) => (
                    <div key={label} className="flex items-baseline gap-0.5">
                        <span className="text-sm font-bold text-indigo-700">{value.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] font-medium text-indigo-400 uppercase">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OfferDashboard = () => {
    const { seller } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getOfferData = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/offers/dashBoardData`, {
                role: seller.role,
            });
            setData(res.data);
        } catch (err) {
            toast.error("Failed to fetch offers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (seller?.role) getOfferData();
    }, [seller?.role]);

    const offers = data?.currentOffers || [];
    const winners = data?.previousWinners || [];

    if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 font-medium">Loading Exclusive Offers...</div>;

    return (
        <div className="w-full  mx-auto p-4 md:p-8 space-y-12">
            
            {/* --- ACTIVE OFFERS SECTION --- */}
            {offers.length > 0 && (
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                                <BadgePercent className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Active Offers</h2>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                            {offers.length} Live
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {offers.map((offer) => (
                            <motion.div
                                key={offer._id}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => navigate(`/offers/${offer._id}`)}
                                className="group relative bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-300 transition-all overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                                    {/* Icon & Title */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="hidden md:flex w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                            <Gift className="w-7 h-7 text-indigo-600" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {offer.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-1">{offer.description}</p>
                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                <div className="flex -space-x-2">
                                                    {offer.products.slice(0, 4).map((p, i) => (
                                                        <img key={i} src={p.productId.imageUrl} className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="" />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    +{offer.products.length} Products
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Countdown & Action */}
                                    <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                        <CountdownTimer targetDate={offer.endDate} />
                                        <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                            Details <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* --- WINNERS SECTION --- */}
            {winners.length > 0 && (
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-500 rounded-xl">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Wall of Winners</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {winners.map((win) => (
                            <div 
                                key={win._id}
                                className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                                        <Medal className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 leading-none mb-1">{win.winner.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{win.winner.companyName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{win.title}</span>
                                    <span className="text-slate-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(win.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Empty State: Only shows if both are empty */}
            {offers.length === 0 && winners.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Tag className="text-slate-300 w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No active promotions</h3>
                    <p className="text-sm text-slate-500">Check back later for exciting new offers!</p>
                </div>
            )}
        </div>
    );
};

export default OfferDashboard;