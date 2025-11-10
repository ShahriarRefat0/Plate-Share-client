import React from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../Components/FoodCard';

const AvailableFoods = () => {
  const foods = useLoaderData()

  //console.log(foods)

  return (
    <div className="w-11/12 mx-auto my-15">
      <div>
        <h1 className="text-5xl font-primary font-semibold text-center">
          Available <span className="text-primary">Foods</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-15">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;