import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";
// import { useNavigate } from 'react-router';
import DatePicker from "react-datepicker";
import LoadingSpinner from "../Components/LoadingSpinner";

const ManageMyFoods = () => {
  const { user } = use(AuthContext);

  const foodModalRef = useRef(null);
  const [myFoods, setMyFoods] = useState([]);
  // const navigate = useNavigate()
  const [expireDate, setExpireDate] = useState();
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFoodDelete = (food) => {
    // console.log("id-delete",food?._id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009368",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/delete-food/${food?._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log('after delete', data)
            if (data.deletedCount) {
              setMyFoods((prev) => prev.filter((f) => f._id !== food._id));
              Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((e) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
            console.log(e);
          });
      }
    });
  };

  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;

    const updateFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: parseInt(form.food_quantity.value),
      pickup_location: form.pickup_location.value,
      expire_date: expireDate
        ? expireDate.toISOString().split("T")[0]
        : form.expire_date.value,
      additional_notes: form.additional_notes.value,
      donator: {
        name: form.donator_name.value,
        email: form.donator_email.value,
        image: user.photoURL,
      },
      food_status: "Available",
    };

    // console.log("update food",updateFood);

    fetch(`http://localhost:3000/update-food/${selectedFood?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Food Update Successfully",
            icon: "success",
            draggable: true,
          });
          form.reset();
          foodModalRef.current.close();
          setMyFoods((preFood) =>
            preFood.map((food) =>
              food._id === selectedFood._id ? { ...food, ...updateFood } : food
            )
          );
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setMyFoods(data);
      })
      .catch((e) => console.log("Error:", e))
      .finally(() => setLoading(false));
  }, [user?.email]);

  //modal open-close
  const handleFoodModalOpen = () => {
    foodModalRef.current.showModal();
  };

  const handleFoodModalClose = () => {
    foodModalRef.current.close();
  };

console.log(myFoods)

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen w-11/12 mx-auto flex flex-col items-center justify-start py-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 font-primary">
        Manage <span className="title">Foods</span>
      </h1>
      {myFoods.length === 0 ? (
        <div colSpan="7" className="py-10 text-gray-400">
          No food found.
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="overflow-x-auto card-shadow rounded-2xl w-full">
            <table className="table w-full text-center">
              {/* head */}
              <thead className="bg-[#009368]/10 text-[#009368] font-semibold">
                <tr>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Expire Date</th>
                  <th>Status</th>
                  <th>Note</th>
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
                          <div className="h-15 w-20 rounded-md">
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
                    <td>{food?.food_quantity}</td>
                    <td>{food?.pickup_location}</td>
                    <td>{food?.expire_date}</td>

                    <td>
                      <div className="badge badge-success text-white">
                        {food?.food_status}
                      </div>
                    </td>
                    <td>{food?.additional_notes}</td>
                    <th className="w-full flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedFood(food);
                          handleFoodModalOpen();
                        }}
                        className="btn btn-soft btn-success hover:text-white rounded-3xl"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleFoodDelete(food)}
                        className="btn btn-soft btn-error hover:text-white rounded-3xl"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
                  defaultValue={selectedFood?.food_name}
                  type="text"
                  name="food_name"
                  placeholder="Food Name"
                  // defaultValue={}
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />

                <input
                  defaultValue={selectedFood?.food_image}
                  type="text"
                  name="food_image"
                  placeholder="Food Image URL"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    defaultValue={selectedFood?.food_quantity}
                    name="food_quantity"
                    placeholder="Food Quantity (e.g., 3)"
                    required
                    className="input input-bordered w-full rounded-full bg-green-50"
                  />

                  <DatePicker
                    selected={expireDate}
                    onChange={(date) => setExpireDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Expire Date"
                    className="input input-bordered w-full rounded-full bg-green-50 focus:ring-2 focus:ring-[#009368] focus:outline-none"
                    minDate={new Date()} // ⏳ prevents picking past dates
                    required
                  />
                </div>

                <input
                  type="text"
                  defaultValue={selectedFood?.pickup_location}
                  name="pickup_location"
                  placeholder="Pickup Location"
                  required
                  className="input input-bordered w-full rounded-full bg-green-50"
                />

                <textarea
                  defaultValue={selectedFood?.additional_notes}
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
