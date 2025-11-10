import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';


const FeaturedFoods = () => {
  const [foods, setFoods]  = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/highest-quantity-foods")
      .then(res => res.json())
      .then(data => {
        setFoods(data)
      });
  },[])
  //console.log(foods)


  return (
    <div className="w-11/12  mx-auto my-15">
      <div>
        <h1 className="text-5xl font-primary font-semibold text-center">
          Featured <span className="text-primary">Foods</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-15">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
      <div className="flex items-center justify-center my-10">
        <button className="btn-primary w-60 flex items-center justify-center gap-5">
          <FaAnglesLeft /> Show All <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default FeaturedFoods;