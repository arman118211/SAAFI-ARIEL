import React from 'react'
import NeHeroSection from './NeHeroSection'
import NeSaafiProductSection from './NeSaafiProductSection'
import BannerSection from '../BannerSection'
import NeFeaturedProducts from './NeFeaturedProducts'
import NeExclusiveOffer from './NeExclusiveOffer'
import NeSaafiGram from './NeSaafiGram'
import NeHappyCustomer from './NeHappyCustomer'
import NeOneStepNation from './NeOneStepNation'
import NeNavbar from './NeNavbar'
import NeFooter from './NeFooter'


function NeHome() {
  return (
    <div>
      <NeNavbar/>
      <NeHeroSection/>
      <NeSaafiProductSection/>
      <BannerSection/>
      <NeFeaturedProducts />
      <NeExclusiveOffer />
      <NeSaafiGram />
      <NeHappyCustomer />
      <NeOneStepNation />
      <NeFooter/>
    </div>
  )
}

export default NeHome