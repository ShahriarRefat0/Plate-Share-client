import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const MyFoodRequests = () => {
  const { user } = use(AuthContext);
  // const [loading, setLoading] = useState(false);
  const [myFoodReq, setMyFoodReq] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://plate-share-server-sigma.vercel.app/user-food-request?user=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log("foods req", data);
        setMyFoodReq(data);
      })
      .catch((e) => {
        // console.log(e);
      });
  }, [user?.email]);

  const handleReqDelete = (food) => {
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
        fetch(
          `https://plate-share-server-sigma.vercel.app/delete-request-food/${food?._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            //console.log('after delete', data)
            if (data.deletedCount) {
              setMyFoodReq((prev) => prev.filter((f) => f._id !== food._id));
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been deleted.",
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
            // console.log(e);
          });
      }
    });
  };

  console.log(myFoodReq);

  return (
    <div className="min-h-screen w-11/12 mx-auto flex flex-col items-center justify-start py-10 bg-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 font-primary">
        My <span className="text-primary ">Food</span> Request
      </h1>
      {myFoodReq.length === 0 ? (
        <div colSpan="7" className="py-10 text-gray-500">
          No food requests found.
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="overflow-x-auto shadow-md rounded-2xl w-full">
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
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myFoodReq.map((food) => (
                  <tr key={food?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-15 w-20 rounded-md">
                            <img
                              src={food?.req_foodImg}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{food?.req_foodName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{food?.req_foodQuantity}</td>
                    <td>{food?.req_location}</td>
                    <td>{food?.req_foodExDate}</td>

                    <td>
                      <div
                        className={`badge  text-white ${
                          food?.req_status === " Accepted"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {food?.req_status}
                      </div>
                    </td>
                    <td>{food?.req_message}</td>
                    <th className="w-full flex justify-center gap-3">
                      <button
                        onClick={() => handleReqDelete(food)}
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
    </div>
  );
};

export default MyFoodRequests;
