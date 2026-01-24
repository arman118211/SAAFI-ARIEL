import React from "react";
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
  Phone
} from "lucide-react";

export default function OrderDetailPage() {
  const products = [
    { id: 1, name: "Acoustic Pro Wireless", quantity: 1, price: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: 2, name: "Thunderbolt 4 Cable", quantity: 2, price: 89.98, image: "https://images.unsplash.com/photo-1610492421943-e329f6db392b?w=200&q=80" },
    { id: 3, name: "Carbon Fiber Case", quantity: 1, price: 59.99, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&q=80" },
  ];

  const orderData = { subtotal: 399.96, discount: 60.0, shipping: "FREE", tax: 32.40, total: 372.36 };

  return (
    <div className="min-h-screen bg-[#FDFDFF]  text-slate-900">
      {/* Desktop Header / Mobile Sticky Nav */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 md:py-6">
        <div className=" mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors md:hidden">
              <ArrowLeft size={20} />
            </button>
            <button className="hidden md:flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
              <ArrowLeft size={18} /> Back
            </button>
            <div className="md:ml-4">
              <h1 className="text-sm md:text-2xl font-black tracking-tight">Order <span className="text-indigo-600">#88291</span></h1>
              <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">Jan 14, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="p-2 md:px-4 md:py-2 md:border md:border-slate-200 md:rounded-xl md:text-sm md:font-bold md:flex md:items-center md:gap-2">
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
            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between relative px-2 md:px-10">
                <div className="absolute top-4 md:top-5 left-8 right-8 h-[2px] bg-slate-100" />
                <div className="absolute top-4 md:top-5 left-8 w-1/3 h-[2px] bg-indigo-500 transition-all" />
                
                {[
                  { label: 'Placed', icon: Box, active: true },
                  { label: 'Process', icon: Clock, active: true },
                  { label: 'Shipped', icon: Truck, active: false },
                  { label: 'Done', icon: CheckCircle2, active: false }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 md:w-11 md:h-11 rounded-full md:rounded-2xl flex items-center justify-center transition-all shadow-sm ${step.active ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300 border border-slate-100'}`}>
                      <step.icon size={14} className="md:w-5 md:h-5" />
                    </div>
                    <span className={`mt-3 text-[9px] md:text-[11px] font-black uppercase tracking-tighter md:tracking-widest ${step.active ? 'text-indigo-600' : 'text-slate-300'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product List - Row Wise (Mobile and Desktop) */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-xs md:text-sm uppercase tracking-wider">Package Items</h3>
                <span className="text-[10px] font-bold text-slate-400">3 TOTAL</span>
              </div>
              <div className="divide-y divide-slate-50">
                {products.map((item) => (
                  <div key={item.id} className="p-4 md:p-6 flex items-center gap-4 md:gap-6 group hover:bg-slate-50 transition-colors">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm" alt="" />
                      <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-lg border-2 border-white">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs md:text-base truncate group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                      <p className="text-[10px] md:text-xs text-slate-400 font-medium mt-0.5 md:mt-1 tracking-tight uppercase">SKU: 882-0{item.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm md:text-xl font-black text-slate-900 leading-none">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="bg-indigo-50/30 rounded-3xl p-5 border border-indigo-100/50">
                <MapPin size={16} className="text-indigo-500 mb-3" />
                <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Shipping</h4>
                <p className="font-black text-slate-800 text-xs md:text-sm">Johnathan Doe</p>
                <p className="text-slate-600 text-[10px] md:text-xs mt-0.5 leading-tight">882 Silicon Valley Dr, CA</p>
              </div>
              <div className="bg-pink-50/30 rounded-3xl p-5 border border-pink-100/50">
                <CreditCard size={16} className="text-pink-500 mb-3" />
                <h4 className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1">Payment</h4>
                <p className="font-black text-slate-800 text-xs md:text-sm">Visa •••• 9012</p>
                <p className="text-slate-600 text-[10px] md:text-xs mt-0.5 leading-tight uppercase font-bold tracking-tighter italic">Authorized</p>
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
                  <span className="text-white font-black ">${orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-indigo-100/70 text-xs font-bold uppercase tracking-wider">
                  <span>Logistics</span>
                  <span className="text-emerald-300 font-black tracking-tighter">FREE</span>
                </div>
                <div className="flex justify-between text-indigo-100/70 text-xs font-bold uppercase tracking-wider">
                  <span>Savings</span>
                  <span className="text-emerald-300 font-black">-${orderData.discount}</span>
                </div>
                
                <div className="pt-6 mt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-1">Grand Total</p>
                    <p className="text-4xl md:text-5xl font-black tracking-tighter leading-none">${orderData.total}</p>
                  </div>
                  <button className="bg-white text-indigo-600 font-black px-5 py-3 rounded-2xl text-xs hover:bg-indigo-50 active:scale-95 transition-all shadow-lg shadow-indigo-900/20">
                    Reorder
                  </button>
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