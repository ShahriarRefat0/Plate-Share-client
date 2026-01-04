import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router";
import axios from "axios";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const foodFetcher = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/highest-quantity-foods`
        );
        setFoods(data);
      } catch (error) {
        console.error("Failed to fetch highest quantity foods:", error);
      }
    };

    foodFetcher();
  }, []);

  //console.log(foods)

  return (
    <div className="w-11/12  mx-auto my-20">
      <div data-aos="fade-down">
        <h1 className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
          Featured <span className="title">Foods</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-15">
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
          className="btn btn-primary w-60 flex text-white items-center justify-center gap-5"
        >
          <FaAnglesLeft /> Show All <FaAnglesRight />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
