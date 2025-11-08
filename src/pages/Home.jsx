import React from 'react'
import HeroSection from '../components/HomePage/Hero'
import CountriesMarque from '../components/HomePage/CountriessMarque'
import MostViewedEvents from '../components/HomePage/MostViewedEvents'
import Features from '../components/HomePage/Features'

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <CountriesMarque />
      <MostViewedEvents />
    </>
  )
}

export default Home