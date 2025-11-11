import React, { useEffect, useState } from 'react';
import FoodCard from '../Components/FoodCard';
import LoadingSpinner from '../Components/LoadingSpinner';

const AvailableFoods = () => {
    const [loading, setLoading] = useState(true)
const [foods, setFoods] =useState([])

  useEffect(() => {
      setLoading(true);
    fetch("http://localhost:3000/foods?status=available")
      .then(res => res.json())
      .then(data => {
        setFoods(data)
      })
      .finally(()=> setLoading(false));
  }, [])
  

  //console.log(foods)
  if (loading)return <LoadingSpinner></LoadingSpinner>;
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