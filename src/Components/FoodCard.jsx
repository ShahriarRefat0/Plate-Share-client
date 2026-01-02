import Aos from 'aos';
import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";
import { Link } from 'react-router';


const FoodCard = ({ food }) => {

useEffect(() => {
  Aos.refresh();
}, []);

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,_id,
    donator: { name, image } = {},
  } = food || {};
//console.log(food)


  return (
    <div
      data-aos="fade-up"
      className=" border border-primary rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-lg transition duration-500 animate__animated animate__fadeInUp"
    >
      <img
        src={food_image}
        alt={food_name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 space-y-3">
        {/* Food Title */}
        <h3 className="text-xl font-semibold font-primary text-[#009368]">
          {food_name}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full border-2 border-[#009368] object-cover"
          />
          <p className="font-medium text-gray-700">{name}</p>
        </div>

        <div className="text-gray-600 text-sm mt-3">
          <div className="flex justify-between">
            <p className="font-medium flex items-center gap-1">
              <IoIosPeople className="icon" /> Quantity:
            </p>
            <p>{food_quantity}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p className="font-medium flex items-center gap-1">
              <FaMapMarkerAlt className="icon" /> Location:
            </p>
            <p>{pickup_location}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p className="font-medium flex items-center gap-1">
              <FaRegClock className="icon" /> Expires:
            </p>
            <p>{expire_date}</p>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            to={`/foods-details/${_id}`}
            className="block text-center border border-[#009368] hover:bg-[#009368] icon hover:text-white py-2 px-5 rounded-full font-semibold  transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;