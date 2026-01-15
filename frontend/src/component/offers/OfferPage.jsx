  import React, { useEffect, useState } from 'react'
  import { useParams, Link } from 'react-router-dom'
  // import { offers } from '../../lib/data'
  import OfferDetails from './OfferDetails'
  import { ArrowLeft } from 'lucide-react'
  import axios from 'axios'
import ScrollToTop from '../ScrollToTop'



  const OfferDetailsShimmer = () => (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* HERO SHIMMER */}
      <div className="bg-gradient-to-r from-blue-700 to-red-900 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slide" />

          <div className="h-6 w-32 bg-white/20 rounded-full" />
          <div className="h-12 w-2/3 bg-white/30 rounded-lg" />
          <div className="h-5 w-1/2 bg-white/20 rounded-lg" />

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 mt-6 max-w-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-white/20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* PRODUCTS LIST */}
          <div className="flex-1 space-y-6">
            <div className="h-7 w-48 bg-gray-200 rounded mb-4" />

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 bg-gray-200" />

                  <div className="p-6 flex-1 space-y-4">
                    <div className="h-5 w-24 bg-gray-200 rounded" />
                    <div className="h-6 w-2/3 bg-gray-300 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-8 w-32 bg-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide" />

              <div className="h-6 w-40 bg-gray-300 rounded mb-6" />

              <div className="space-y-3 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              <div className="h-10 w-full bg-gray-300 rounded-lg mb-4" />
              <div className="h-12 w-full bg-gray-400 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );


  export default function OfferPage() {
    const [loading, setLoading] = useState(true);

    const { id } = useParams()
    const [offer, setOffer] = useState()
    const calculateTotalPrice = (product) => {
      const price = product.productId?.price || 0
      const packSize = product.productId?.packSize || 1
      const minQty = product.minQty || 1

      return price * packSize * minQty
    }

    const getSingleData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/offers/${id}`
        );
        setOffer(res.data.offer);
      } catch (err) {
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };


    useEffect(()=>{
      getSingleData()
    },[])

  if (loading) {
    return <OfferDetailsShimmer />;
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Offer Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The offer you are looking for does not exist or has expired.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-700 font-medium hover:underline"
        >
          <ArrowLeft size={20} />
          Back to All Offers
        </Link>
      </div>
    );
  }


    return <div>
      <ScrollToTop/>
      <OfferDetails offer={offer} />

    </div> 
  }
