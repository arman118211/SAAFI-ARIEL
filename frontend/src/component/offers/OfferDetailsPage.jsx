import React, { useEffect, useState } from 'react'
// import { offers } from '../../lib/data'
import OfferCard from './OfferCard'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { Gift, Bell } from "lucide-react";


export default function OfferDetailsPage() {
    const location = useLocation();
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true);
    console.log("BASE URL:", import.meta.env.VITE_BASE_URL);
    const getData = async () => {
    try {
      const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/offers/activeOffer`
          );
          setOffers(res.data.offers || []);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() =>{
        getData()

    },[])
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {!loading && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          
          {/* Icon */}
          <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Gift className="w-10 h-10 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            No Active Offers Right Now
          </h2>

          {/* Message */}
          <p className="text-gray-600 max-w-md mb-6">
            There are no active offers at the moment. Please stay in touch with us for
            the latest offer updates.
          </p>

          {/* Optional CTA */}
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition">
            <Bell className="w-4 h-4" />
            Get Notified
          </button>

        </div>
      )}

      <div className="mx-auto">
        {location.pathname !== "/dashboard" && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Exclusive Offers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our limited-time bundles and special deals. Don't miss out on these amazing savings.
          </p>
        </div>
      )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  )
}
