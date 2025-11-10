import React, { use, useEffect, useRef } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const ManageMyFoods = () => {
  const { user } = use(AuthContext)
  const foodModalRef = useRef(null)
const navigate = useNavigate()
  const handleFoodModalOpen = () => {
    foodModalRef.current.showModal()
  }



 const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log('added')

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
        image: user.photoURL,
      },
      food_status: "Available",
    };

    console.log(newFood);

    fetch(`http://localhost:3000/update-food?email=${user?.email}`, {
      method: "PUT",
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
               title: "Food Update Successfully",
               icon: "success",
               draggable: true,
             });
          // form.reset()
          navigate('/')
        }
      })
      .catch((e) => {
        //console.log(e.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };








  // useEffect(() => {
  //   fetch(`http://localhost:3000/update-food?email=${user.email}`, {
  //     method: 'PUT',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(updateFood)
  //   })
  //     .then(res => {
  //       res.json()
  //     })
  //     .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // },[])
  
  return (
    <div className="w-11/12  mx-auto my-15">
      <h1 className="text-3xl md:text-5xl font-bold text-center  mb-4 font-primary">
        Manage <span className="text-primary ">Foods</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Food</th>
              <th>Status</th>
              <th>Update / Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="h-15 w-25 rounded-md">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="badge badge-success text-white">Success</div>
              </td>

              <th className="flex flex-col gap-4 md:flex-row">
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
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={foodModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-semibold text-lg font-primary">
            Update <span className="text-primary">Food</span> Info
          </h3>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}

            <form
              method="dialog"
              onSubmit={handleUpdateFood}
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
                className="btn w-full bg-[#009368] hover:bg-[#007a55] text-white rounded-full mt-4 font-semibold"
              >
                {/* {loading ? "Adding..." : "Add Food"} */} add
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageMyFoods;