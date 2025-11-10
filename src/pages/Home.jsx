import React from 'react';
import Login from './Login';
import Register from './Register';
import Hero from '../Components/Hero';
import FoodCard from '../Components/FoodCard';
import OurMission from '../Components/OurMission';
import HowItWorks from '../Components/HowItWorks';
import FeaturedFoods from '../Components/FeaturedFoods';

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <OurMission></OurMission>
      <HowItWorks></HowItWorks>
    <FeaturedFoods></FeaturedFoods>
    </div>
  );
};

export default Home;