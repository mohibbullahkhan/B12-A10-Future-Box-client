import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyPayBills = () => {
  const { user } = use(AuthContext);
  const [bills, setBills] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/myBills?email=${user.email}`).then((data) => {
      setBills(data.data);
    });
  }, [user, axiosSecure]);

  const handleDeleteBid = (billid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myBills/${billid}`)
          .then((res) => {
            const data = res.data;

            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bill has been deleted.",
                icon: "success",
              });

              const remainingBids = bills.filter((bid) => bid._id !== billid);
              setBills(remainingBids);
            } else {
              Swal.fire(
                "Error",
                "Could not delete the item. It may have already been deleted.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire(
              "Error",
              "Deletion failed due to a server or network issue.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      <h3>My Bids: {bills.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bid, index) => (
              <tr key={bid._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bid.username}</div>
                      <div className="text-sm opacity-50">{bid.Address}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Wyman-Ledner
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Community Outreach Specialist
                  </span>
                </td>
                <td>{bid.bid_price}</td>
                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayBills;
