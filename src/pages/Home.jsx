import React from 'react';
import Login from './Login';
import Register from './Register';
import Hero from '../Components/Hero';
import FoodCard from '../Components/FoodCard';
import OurMission from '../Components/OurMission';

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FoodCard></FoodCard>
      <OurMission></OurMission>
    </div>
  );
};

export default Home;