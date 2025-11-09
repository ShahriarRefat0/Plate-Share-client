import React from 'react';
import Login from './Login';
import Register from './Register';
import Hero from '../Components/Hero';
import FoodCard from '../Components/FoodCard';

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FoodCard></FoodCard>
    </div>
  );
};

export default Home;