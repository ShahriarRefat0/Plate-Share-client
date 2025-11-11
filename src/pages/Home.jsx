import React, {  useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import Hero from '../Components/Hero';

import OurMission from '../Components/OurMission';
import HowItWorks from '../Components/HowItWorks';
import FeaturedFoods from '../Components/FeaturedFoods';
import LoadingSpinner from '../Components/LoadingSpinner';




const Home = () => {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
const timer = setTimeout(() => {
     setLoading(false)
}, 2000)
    return ()=> clearTimeout(timer)
  },[])

if(loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Hero></Hero>
      <FeaturedFoods></FeaturedFoods>
      <HowItWorks></HowItWorks>
      <OurMission></OurMission>
      

    </div>
  );
};

export default Home;