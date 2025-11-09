import React from 'react';


const FoodCard = () => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-500 animate__animated animate__fadeInUp"
      // style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* <img src={image} alt={serviceName} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Food name
        </h3>
        <div className="max-h-17 ">
          <div className="flex justify-between items-center">
            <p>Ratings:</p>
            <p className="text-yellow-500 font-semibold mb-2">⭐ {rating}</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p>Fee:</p>
            <p className="text-gray-700 font-medium ">${price}</p>
          </div>
        </div>
        <Link
          // to={`/service-details/${serviceId}`}
          className="bg-[#F8721F] text-white font-semibold px-6 py-2 rounded-xl hover:bg-white hover:text-[#F8721F] border border-[#F8721F] transition-all duration-300"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default FoodCard;