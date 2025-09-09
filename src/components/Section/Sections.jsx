import React from 'react'
import Baner from './Baner'
import MajarajoCarousel from './Carousel/MajarajoCarousel'
import TravelServices from './TravelSevices'
import TourCarousel from './TourCarousel'
import PremiumCarousel from './Carousel/PremiumCarousel'
import HeroBanner from './HeroBanner'
import CityToursCarousel from './Carousel/CityToursCarousel'
import TestimonialSection from './TestimonialSection'
import ArticleCart from './ArticleCard'

function Sections() {
  return (
    <div>
      <div className="container" >
        <Baner />
        <TravelServices />
        <MajarajoCarousel />
        <TourCarousel />
        <PremiumCarousel />
        <HeroBanner />1
        <CityToursCarousel />
        <TestimonialSection />
      </div>
      <ArticleCart />
    </div>

  )
}

export default Sections
