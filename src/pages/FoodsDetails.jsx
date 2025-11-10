import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import { IoIosPeople } from 'react-icons/io';
import { Link, useParams } from 'react-router';

const FoodsDetails = () => {
  const { id } = useParams()
  const [foodDetails, setFoodDetails] = useState()
  // console.log(id)
  const { food_name, food_image, food_quantity, pickup_location, expire_date, additional_notes, food_status, donator: { name, email, image } = {}, } = foodDetails || { };


  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then(res => res.json())
      .then(data => {
        setFoodDetails(data)
      });
  }, [id])
//console.log(foodDetails);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <Link to='/'  className="mb-5 flex gap-3 items-center text-primary cursor-pointer">
        <HiOutlineArrowLeft size={25}/> <p>Back</p>
      </Link>
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative">
            <img
              src={food_image}
              alt={food_name}
              className="h-80 md:h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
            <div className="absolute top-4 left-4 bg-[#009368] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
              {food_status}
            </div>
          </div>

          {/* Right Side — Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#009368] mb-3 font-primary">
                {food_name}
              </h1>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center border-b pb-2">
                  <p className="flex items-center gap-2 font-medium">
                    <IoIosPeople className="text-[#009368]" /> Quantity:
                  </p>
                  <p className="text-gray-800 font-semibold">
                    Serves {food_quantity} People
                  </p>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <p className="flex items-center gap-2 font-medium">
                    <FaMapMarkerAlt className="text-[#009368]" /> Location:
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {pickup_location}
                  </p>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <p className="flex items-center gap-2 font-medium">
                    <FaRegClock className="text-[#009368]" /> Expires:
                  </p>
                  <p className="text-gray-800 font-semibold">{expire_date}</p>
                </div>

                <p className="text-gray-600 leading-relaxed mt-4">
                  {additional_notes || "No additional notes available."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <img
                src={image}
                alt={name}
                className="w-14 h-14 rounded-full border-2 border-[#009368] object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{name}</p>
                <p className="text-gray-500 text-sm">{email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-[#009368] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#007a55] transition duration-300 shadow-md">
                Request This Food
              </button>

              <Link
                to="/available-foods"
                className="border border-[#009368] text-[#009368] font-semibold px-6 py-2 rounded-full hover:bg-[#009368] hover:text-white transition duration-300"
              >
                Back to Foods
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodsDetails;