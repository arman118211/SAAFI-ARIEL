import React, { useEffect, useState } from 'react'
// import { offers } from '../../lib/data'
import OfferCard from './OfferCard'
import axios from 'axios'
import { useLocation } from "react-router-dom";

export default function OfferDetailsPage() {
    const location = useLocation();
    const [offers, setOffers] = useState([])
    console.log("BASE URL:", import.meta.env.VITE_BASE_URL);
    const getData = async () =>{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/offers/activeOffer`);
        // console.log("res==>",res.data.offers)
        setOffers(res.data.offers)

    }
    useEffect(() =>{
        getData()

    },[])
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
