import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';
import { useNavigate } from "react-router-dom";
import ScrollToTop from '../ScrollToTop';

function MainDashboard() {
    const { seller, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    console.log(seller,token)

    useEffect(() => {
      if (!seller || !token) {
        navigate("/login");
      }
    }, [seller, token, navigate]);

    if (!seller || !token) {
      return null;
    }
  return (
    <div>
      <ScrollToTop/>
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