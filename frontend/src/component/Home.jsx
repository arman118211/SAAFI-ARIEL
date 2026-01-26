import React from 'react'
import HeroSection from './HeroSection'
import SaafiProductSection from './SaafiProductSection'
import BannerSection from './BannerSection'
import FeaturedProducts from './FeaturedProducts'
import ExclusiveOffer from './ExclusiveOffer'
import SaafiGram from './SaafiGram'
import HappyCustomer from './HappyCustomer'
import OneStepNation from './OneStepNation'
import ProfessionalOffers from './OffersSection'
import FloatingCartBadge from './ProductDetail/FloatingCartBadge'
import FloatingBadges from '../utils/FloatingBadges'

function Home() {
  return (
    <div>
      <HeroSection/>
      <FloatingBadges/>
      <SaafiProductSection/>
      <ProfessionalOffers/>
      <BannerSection />
      <FeaturedProducts />
      <ExclusiveOffer />
      <SaafiGram />
      <HappyCustomer />
      <OneStepNation />
    </div>
  )
}

export default Home