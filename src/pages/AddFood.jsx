import React, { useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

const AddFood = () => {
  const [expireData, setExpireDate] = useState(null)

  const handleAddFood=(e) => {
    e.preventDefault();
    console.log('added' )
  }
  return (
    <div className="py-10 min-h-screen animated-bg">
      <div className="text-center">
        <div className="text-primary text-xl flex gap-3 items-center justify-center ">
          <span>
            <HiOutlineArrowLeft />
          </span>{" "}
          <p>Back To Home</p>
        </div>
      </div>
      <div className="card">
        <div className=" flex items-center justify-center  py-10">
          <form
            onSubmit={handleAddFood}
            className="bg-white w-full max-w-3xl shadow-2xl rounded-3xl p-8 md:p-10 space-y-6"
          >
            <h3 className="ext-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
              Add <span className="text-primary">Food</span>
            </h3>
            {/* Food Info Section */}
            <div className="space-y-4">
              <input
                type="text"
                name="food_name"
                placeholder="Food Name"
                required
                className="input input-bordered w-full rounded-full bg-green-50"
              />

              <input
                type="text"
                name="food_image"
                placeholder="Food Image URL"
                required
                className="input input-bordered w-full rounded-full bg-green-50"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="food_quantity"
                  placeholder="Food Quantity (e.g., 3)"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />

                <input
                  type="date"
                  name="expire_date"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />
              </div>

              <input
                type="text"
                name="pickup_location"
                placeholder="Pickup Location"
                required
                className="input input-bordered w-full rounded-full bg-green-50"
              />

              <textarea
                name="additional_notes"
                placeholder="Additional Notes"
                rows="3"
                className="textarea textarea-bordered w-full rounded-2xl bg-green-50"
              ></textarea>
            </div>

            <div className="border-t pt-6 mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#009368]">
                Donator Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="donator_name"
                  placeholder="Donator Name"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />

                <input
                  type="email"
                  name="donator_email"
                  placeholder="Donator Email"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={loading}
              className="btn w-full bg-[#009368] hover:bg-[#007a55] text-white rounded-full mt-4 font-semibold"
            >
              {/* {loading ? "Adding..." : "Add Food"} */} add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;