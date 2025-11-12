import React, { use, useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { Link, useParams } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const FoodsDetails = () => {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState();
  const reqModalRef = useRef();
  const { user } = use(AuthContext);
  const [foodRequests, setFoodRequests] = useState([]);
  // console.log(id)
  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    food_status,

    donator: { name, email, image } = {},
  } = foodDetails || {};


  const handleRequestStatus = (id, foodId, status) => {
    fetch(`http://localhost:3000/update-request/${id}`, {
      method: "PUT",
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({status, foodId})
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: `Request ${status}!`,
            icon: status === "Accepted" ? "success" : "error",
          });

          setFoodRequests((pre) =>
            pre.map((req) => (req._id ? { ...req, req_status: status } : req))
          );

          if (status === "Accepted") {
            setFoodDetails((pre) => ({ ...pre, food_status: "Donated" }));
          }
        }
    })
    
}



  const handleReqFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const reqInfo = {
      req_location: form.req_location.value,
      req_contact: form.req_contact.value,
      req_message: form.req_message.value,
      req_name: user?.displayName,
      req_email: user?.email,
      req_userPhoto: user?.photoURL,
      req_foodId: id,
      req_status: "Pending",
      req_foodName: food_name,
      donator_email: foodDetails.donator.email,
    };

    // console.log(reqInfo)

    fetch(`http://localhost:3000/food-request`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Sed Done",
            text: "Food request send successfully.",
            icon: "success",
          });
          form.reset();
        }
        reqModalRef.current.close();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };


  useEffect(() => {
    if (!id || !user?.email) return;
    fetch(
      `http://localhost:3000/food-request?req_foodId=${id}&donator_email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("foods req", data);
        setFoodRequests(data);
      })
      .catch((e) => console.log(e));
  }, [id, user?.email]);




  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFoodDetails(data);
      });
  }, [id]);
  //console.log(foodDetails);

  const handleReqModalOpen = () => {
    reqModalRef.current.showModal();
  };
  const handleReqModalCose = () => {
    reqModalRef.current.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <Link
        to="/"
        className="mb-5 flex gap-3 items-center text-primary cursor-pointer"
      >
        <HiOutlineArrowLeft size={25} /> <p>Back</p>
      </Link>
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative">
            <img
              src={food_image}
              alt={food_name}
              className="h-80 md:h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
            <div
              className={`absolute top-4 left-4 bg-[#009368] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md ${
                food_status == "Available" ? "bg-[#009368] " : "bg-[#d8d500] "
              }`}
            >
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
              <button onClick={handleReqModalOpen} className="btn-primary ">
                Request This Food
              </button>

              <Link to="/available-foods" className="btn-secondary">
                Back to Foods
              </Link>
            </div>
          </div>
        </div>

        {/* modal */}

        <dialog
          ref={reqModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <form
                method="dialog"
                onSubmit={handleReqFood}
                className="bg-transparent w-full md:max-w-3xl rounded-3xl  space-y-6"
              >
                <h3 className="font-semibold text-2xl font-primary text-center">
                  Request for <span className="text-primary">Food</span>
                </h3>
                {/* Food Info Section */}

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="req_location"
                      placeholder="Write Location"
                      required
                      className="input input-bordered w-full rounded-full bg-green-50"
                    />

                    <input
                      type="text"
                      name="req_contact"
                      placeholder="Contact No:"
                      required
                      className="input input-bordered w-full rounded-full bg-green-50"
                    />
                  </div>

                  <textarea
                    name="req_message"
                    placeholder="Why Need Food "
                    rows="3"
                    className="textarea textarea-bordered w-full rounded-2xl bg-green-50"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  // disabled={loading}
                  className="btn-primary w-full "
                >
                  {/* {loading ? "Adding..." : "Add Food"} */} Submit Request
                </button>
                <button onClick={handleReqModalCose} className="btn-secondary ">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* request table */}
      <div className="mt-35">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 font-primary">
          Requests For<span className="text-primary "> Food</span>
        </h1>

        <div className="w-full flex justify-center ">
          <div className="overflow-x-auto shadow-md rounded-2xl w-full">
            <table className="table w-full text-center">
              {/* head */}
              <thead className="bg-[#009368]/10 text-[#009368] font-semibold">
                <tr>
                  <th>Requester</th>
                  <th>Contact Info</th>
                  <th>Food Status</th>
                  <th>Note</th>
                  <th>Request status</th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {foodRequests.map((request) => (
                  <tr key={request?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-12 w-12 border-2 border-green-600  rounded-full">
                            <img
                              src={request?.req_userPhoto}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-600">
                            {request?.req_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request?.req_email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-600">
                        <p> {request?.req_contact}</p>
                        <p>{request?.req_location}</p>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-warning text-white">
                        {request?.req_status}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-600">
                        {request?.req_message}
                      </div>
                    </td>
                    <th className="w-full flex justify-center gap-6">
                      <button
                        onClick={() => {
                          handleRequestStatus(
                            request._id,
                            request.req_foodId,
                            "Accepted"
                          );
                        }}
                        disabled={request.req_status !== "Pending"}
                        className="btn btn-soft btn-success hover:text-white rounded-3xl"
                      >
                        {request.req_status === "Accepted" ? "Accept" : "Request Accepted"}
                      </button>

                      <button
                        onClick={() =>
                          handleRequestStatus(
                            request._id,
                            request.req_foodId,
                            "Rejected"
                          )
                        }
                        className={`btn btn-soft btn-error hover:text-white rounded-3xl ${
                          request.req_status !== "Pending" ? "hidden " : ""
                        }`}
                      >
                        Reject
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodsDetails;
