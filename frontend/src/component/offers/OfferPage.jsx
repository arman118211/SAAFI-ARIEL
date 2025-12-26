import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import { offers } from '../../lib/data'
import OfferDetails from './OfferDetails'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'

export default function OfferPage() {
  const { id } = useParams()
  const [offer, setOffer] = useState()

  const getSingleData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/offers/${id}`)
    console.log("single data=>",res.data.offer)
    setOffer(res.data.offer)
  }

  useEffect(()=>{
    getSingleData()
  },[])

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Offer Not Found</h1>
        <p className="text-gray-600 mb-8">The offer you are looking for does not exist or has expired.</p>
        <Link 
          to="/"
          className="flex items-center gap-2 text-blue-700 font-medium hover:underline"
        >
          <ArrowLeft size={20} />
          Back to All Offers
        </Link>
      </div>
    )
  }

  return <OfferDetails offer={offer} />
}
