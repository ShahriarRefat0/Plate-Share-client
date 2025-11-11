import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';

const ManageMyFoods = () => {
  const { user } = use(AuthContext)
  const foodModalRef = useRef(null)
  const [myFoods, setMyFoods] = useState([])
// const navigate = useNavigate()
const [expireDate, setExpireDate] = useState();


   console.log(user?.email)
  
  

 const handleUpdateFood = (e) => {
   e.preventDefault();
  //  const form = e.target;
   // console.log('added')

  //  const newFood = {
  //    food_name: form.food_name.value,
  //    food_image: form.food_image.value,
  //    food_quantity: parseInt(form.food_quantity.value),
  //    pickup_location: form.pickup_location.value,
  //    expire_date: expireDate.toISOString().split("T")[0],
  //    additional_notes: form.additional_notes.value,
  //    donator: {
  //      name: form.donator_name.value,
  //      email: form.donator_email.value,
  //      image: user.photoURL,
  //    },
  //    food_status: "Available",
  //  };

  // console.log(newFood);

  //  fetch(`http://localhost:3000/update-food?email=${user?.email}`, {
  //    method: "PUT",
  //    headers: {
  //      "content-type": "application/json",
  //    },
  //    body: JSON.stringify(newFood),
  //  })
  //    .then((res) => res.json())
  //    .then((data) => {
  //      // console.log(data);
  //      if (data.insertedId) {
  //        Swal.fire({
  //          title: "Food Update Successfully",
  //          icon: "success",
  //          draggable: true,
  //        });
  //        // form.reset()
  //        navigate("/");
  //      }
  //    })
  //    .catch((e) => {
  //      //console.log(e.message);
  //      Swal.fire({
  //        icon: "error",
  //        title: "Oops...",
  //        text: "Something went wrong!",
  //      });
  //    });
 };

  
  
  
useEffect(() => {
  if (!user?.email) return;

  fetch(`http://localhost:3000/manage-foods?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      setMyFoods(data)
    })
    .catch((e) => console.log("Error:", e));
}, [user?.email]);
  
  //modal open-close
  const handleFoodModalOpen = () => {
    foodModalRef.current.showModal()
  } 

  const handleFoodModalClose = () => {
    foodModalRef.current.close()
  }
  

  // console.log(myFoods);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 font-primary">
        Manage <span className="text-primary ">Foods</span>
      </h1>

      <div className="w-full flex justify-center">
        <div className="overflow-x-auto shadow-md rounded-2xl w-full md:w-5/6 lg:w-3/4">
          <table className="table w-full text-center">
            {/* head */}
            <thead className="bg-[#009368]/10 text-[#009368] font-semibold">
              <tr>
                <th>Food</th>
                <th>Status</th>
                <th>Update / Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myFoods.map((food) => (
                <tr key={food?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="h-15 w-25 rounded-md">
                          <img
                            src={food?.food_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{food?.food_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-success text-white">
                      {food?.food_status}
                    </div>
                  </td>

                  <th className="w-full flex justify-center gap-6">
                    <button
                      onClick={handleFoodModalOpen}
                      className="btn btn-soft btn-success hover:text-white rounded-3xl"
                    >
                      Update
                    </button>

                    <button className="btn btn-soft btn-error hover:text-white rounded-3xl">
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      <dialog ref={foodModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}

            <form
              method="dialog"
              onSubmit={handleUpdateFood}
              className="bg-transparent w-full md:max-w-3xl rounded-3xl  space-y-6"
            >
              <h3 className="font-semibold text-2xl font-primary text-center">
                Update <span className="text-primary">Food</span> Info
              </h3>
              {/* Food Info Section */}

              <div className="space-y-2">
                <input
                  type="text"
                  name="food_name"
                  placeholder="Food Name"
                  // defaultValue={}
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

              <div className="border-t pt-2 mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-[#009368]">
                  Donator Information
                </h3>

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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // disabled={loading}
                className="btn-primary w-full "
              >
                {/* {loading ? "Adding..." : "Add Food"} */} add
              </button>
              <button onClick={handleFoodModalClose} className="btn-secondary ">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageMyFoods;