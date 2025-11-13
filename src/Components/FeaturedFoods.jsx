import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://plate-share-server-sigma.vercel.app/highest-quantity-foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      });
  }, []);
  //console.log(foods)

  return (
    <div className="w-11/12  mx-auto my-20">
      <div data-aos="fade-down">
        <h1 className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
          Featured <span className="text-primary">Foods</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-15">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
      <div
        data-aos="zoom-in-down"
        className="flex items-center justify-center my-10"
      >
        <Link
          to="/available-foods"
          className="btn-primary w-60 flex items-center justify-center gap-5"
        >
          <FaAnglesLeft /> Show All <FaAnglesRight />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
