
import Navbar from './component/Navbar'
import WashCloth from './component/WashCloth'
import About from './component/About'
import Contact from './component/Contact'
import Footer from './component/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './component/Home'
import NeWashCloth from './component/pages/NeWashCloth'
import WhyChooseUs from './component/WhyChooseUs'
import ScrollToTop from './component/ScrollToTop'
import NeShop from './component/pages/NeShop'
import NeHome from './component/pages/NeHome'
import NeContact from './component/pages/NeContact'
import NeAbout from './component/pages/NeAbout'
import NeWhyChooseUs from './component/pages/NeWhyChooseUs'
import ISOCertificatePopup from './component/ISOCertificatePopup'
import OfferDetailsPage from './component/offers/OfferDetailsPage'
import OfferPage from './component/offers/OfferPage'
import Login from './component/login/login'
import Dashboard from './component/dashboard/AdminDashboard'
import SellerDashboard from './component/dashboard/SellerDashboard'
import MainDashboard from './component/dashboard/MainDashboard'
import Order from './component/seller-dasboared/Order'
import ProductPage from './component/admin-dashboard/ProductPage'
import SellerDetail from './component/admin-dashboard/SellerDetails'
import OfferDetailPage from './component/admin-dashboard/OfferDetailPage'
import ImageUpload from './component/ImageUpload'
import DealerDetails from './component/admin-dashboard/DealerDetails'
import ShopPage from './component/shop/Shop'
import ProductDetailPage from './component/ProductDetail/ProductDetailPage'
import CheckoutPage from './component/checkout/CartPage'
import FloatingCartBadge from './component/ProductDetail/FloatingCartBadge'


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/Ne-how-to-wash", "/Ne-shop","/Nepal","/Ne-contact","/Ne-about","/Ne-why-choose-us"];
  const shouldHide = hideNavbarFooter.includes(location.pathname);
  const isHomePage = location.pathname === "/" || location.pathname === "/Nepal";

  return (
    <>  
    
    {/* <ScrollToTop/> */}
     {/* <ISOCertificatePopup showOnHomePage={isHomePage} /> */}
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/how-to-wash" element={<WashCloth />} />
        <Route path="/why-choose-us" element={<WhyChooseUs/>} />
        <Route path="/new-offer" element={<OfferDetailsPage/>} />
        <Route path="/offers/:id" element={<OfferPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<MainDashboard/>} />
        <Route path="/product" element={<ProductPage/>} />
        <Route path="/seller/:id" element={<SellerDetail />} />
        <Route path="/offer/:id" element={<OfferDetailPage />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/dealers/:dealerId" element={<DealerDetails />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/productDetails/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CheckoutPage />} />






        <Route path="/Ne-how-to-wash" element={<NeWashCloth />} />
        <Route path="/Ne-shop" element={<NeShop />} />
        <Route path="/Nepal" element={<NeHome />} />
        <Route path="/Ne-contact" element={<NeContact />} />
        <Route path="/Ne-about" element={<NeAbout />} />
        <Route path="/Ne-why-choose-us" element={<NeWhyChooseUs/>} />

        
      </Routes>
      {location.pathname !== "/cart" && <FloatingCartBadge />}
      {!shouldHide && <Footer />}
    
    
    </>
  )
}

export default App
