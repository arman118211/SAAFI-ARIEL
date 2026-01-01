import React from 'react'
import { useSelector } from "react-redux";
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';

function MainDashboard() {
    const { seller, token } = useSelector((state) => state.auth);
    console.log(seller,token)
  return (
    <div>
        {
            (seller.role === "seller" ||seller.role === "retailer"||seller.role === "dealer") && <SellerDashboard/>
        }
        {
            seller.role === "admin" && <AdminDashboard/>
        }
    </div>
  )
}

export default MainDashboard