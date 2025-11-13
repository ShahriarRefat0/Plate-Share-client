import React, { use, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";


const AddFood = () => {
  const [loading, setLoading] = useState(false)
  const [expireDate, setExpireDate] = useState(null);
  const { user } = use(AuthContext);

  // console.log(user)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500);
    return ()=> clearTimeout(timer)
  }, [])
  


  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log('added')
setLoading(true)
    const newFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: parseInt(form.food_quantity.value),
      pickup_location: form.pickup_location.value,
      expire_date: expireDate.toISOString().split("T")[0],
      additional_notes: form.additional_notes.value,
      donator: {
        name: form.donator_name.value,
        email: form.donator_email.value,
        image: form.donator_photoURL.value,
      },
      food_status: "Available",
    };

    //console.log(newFood);

    fetch("http://localhost:3000/foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
             Swal.fire({
               title: "Food Added Successfully",
               icon: "success",
               draggable: true,
             });
           form.reset()

        }
      })
      .catch((e) => {
        //console.log(e.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(()=>setLoading(false));
  };

  if(loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="py-10 min-h-screen animated-bg">
      <div className="text-center">
        <Link
          to="/"
          className="text-primary text-xl flex gap-3 items-center justify-center "
        >
          <span>
            <HiOutlineArrowLeft />
          </span>{" "}
          <p>Back To Home</p>
        </Link>
      </div>
      <div className="card">
        <div className=" flex items-center justify-center  py-10">
          <form
            onSubmit={handleAddFood}
            className="bg-white w-full max-w-3xl shadow-2xl rounded-3xl p-8 md:p-10 space-y-6"
          >
            <h3 className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
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

                <DatePicker
                  selected={expireDate}
                  onChange={(date) => setExpireDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Expire Date "
                  className="input input-bordered w-full rounded-full bg-green-50 focus:ring-2 focus:ring-[#009368] focus:outline-none"
                  minDate={new Date()} // ⏳ prevents picking past dates
                  required
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

              <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    name="donator_name"
                    placeholder="Donator Name"
                    required
                    className="input input-bordered w-full rounded-full bg-green-50"
                  />

                  <input
                    type="email"
                    name="donator_email"
                    defaultValue={user?.email}
                    placeholder="Donator Email"
                    required
                    className="input input-bordered w-full rounded-full bg-green-50"
                  />
                </div>
                <input
                  defaultValue={user?.photoURL}
                  type="text"
                  name="donator_photoURL"
                  placeholder="Donator Image URL"
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
