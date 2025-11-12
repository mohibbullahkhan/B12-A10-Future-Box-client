import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

const BilDetails = () => {
  const { id: billId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const bilModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  // current date formatting
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (billId) {
      setLoading(true);

      axiosSecure
        .get(`/bills/${billId}`)
        .then((response) => {
          setBill(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          setLoading(false);
        });
    }
  }, [axiosSecure, billId]);

  // --- Pay Button Logic ---
  const isCurrentMonth = () => {
    if (!bill || !bill.date) return false;

    const billMonthYear = dayjs(bill.date).format("YYYY-MM");
    const currentMonthYear = dayjs().format("YYYY-MM");
    return billMonthYear === currentMonthYear;
  };

  const isPayButtonEnabled = isCurrentMonth();

  const handleBillModalOpen = () => {
    if (isPayButtonEnabled) {
      bilModalRef.current.showModal();
    }
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const amount = parseFloat(e.target.amount.value);
    const date = e.target.date.value;
    const additionalInfo = e.target.additionalInfo.value;

    const newBillData = {
      billId: bill._id,
      username: username,
      phone: phone,
      address: address,
      email: email,
      amount: amount,
      datePaid: date,
      additionalInfo: additionalInfo,
      status: "Paid",
    };

    axiosSecure
      .post("/myBills", newBillData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Bill successfully paid and recorded!");
          bilModalRef.current.close();
        } else {
          toast.error("Failed to record payment.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred during payment submission.");
        console.error("Error creating new bill:", error);
      });
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-xl">Loading Bill Details... </div>
    );
  }
  if (!bill) {
    return (
      <div className="text-center py-16 text-xl text-red-500">
        Bill not found or access denied.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 p-6">
          <img
            src={bill.image}
            alt={bill.title}
            className="w-full h-80 object-cover rounded-md"
          />
        </div>
        <div className="md:w-1/2 p-6 space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {bill.title}
          </h1>
          <div className="space-y-2 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-blue-600">Category:</span>{" "}
              {bill.category}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Location:</span>{" "}
              {bill.location}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Amount:</span> $
              {bill.amount}
            </p>
            <p>
              <span className="font-semibold text-blue-600">Bill Date:</span>{" "}
              {dayjs(bill.date).format("MMMM D, YYYY")}
            </p>
          </div>
          <p className="text-gray-600 pt-4 border-t border-gray-200">
            <span className="font-semibold text-gray-800 block mb-1">
              Description:
            </span>
            {bill.description}
          </p>

          <div className="pt-6">
            <button
              onClick={handleBillModalOpen}
              className={`btn w-full text-lg ${
                isPayButtonEnabled
                  ? "btn-primary"
                  : "btn-disabled bg-gray-400 border-none"
              }`}
              disabled={!isPayButtonEnabled}
            >
              {isPayButtonEnabled
                ? "Pay Bill Now"
                : "Cannot Pay: Bill is not for the current month"}
            </button>
            {!isPayButtonEnabled && (
              <p className="text-sm text-red-500 mt-2">
                Only current month bills ({dayjs().format("MMMM YYYY")}) can be
                paid.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pay Bill Modal */}
      <dialog ref={bilModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center text-blue-600">
            Submit Payment Details
          </h3>
          <p className="py-4 text-center">
            Confirm your personal details to proceed with the bill payment.
          </p>

          <form onSubmit={handleBillSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bill ID (Read-only) */}
              <div>
                <label className="label">Bill ID</label>
                <input
                  type="text"
                  name="billId"
                  className="input input-bordered w-full"
                  readOnly
                  defaultValue={bill._id}
                />
              </div>

              {/* Amount (Read-only) */}
              <div>
                <label className="label">Amount</label>
                <input
                  type="text"
                  name="amount"
                  className="input input-bordered w-full font-bold text-lg"
                  readOnly
                  defaultValue={bill.amount}
                />
              </div>

              {/* Username (Pre-filled and Read-only) */}
              <div>
                <label className="label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="input input-bordered w-full"
                  readOnly
                  defaultValue={user?.displayName || "N/A"}
                />
              </div>

              {/* Email (Pre-filled and Read-only) */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  readOnly
                  defaultValue={user?.email || "N/A"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  placeholder="e.g., 017XXXXXXXX"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="label">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className="input input-bordered w-full"
                  placeholder="e.g., House #123, Dhaka"
                  required
                />
              </div>

              {/* Date (Auto-filled Current Date - Read-only) */}
              <div className="col-span-1">
                <label className="label">Payment Date</label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full"
                  readOnly
                  defaultValue={today}
                />
              </div>

              {/* Additional info */}
              <div className="col-span-full">
                <label className="label">Additional Info (Optional)</label>
                <textarea
                  name="additionalInfo"
                  className="textarea textarea-bordered w-full"
                  placeholder="Any specific instructions or notes"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-success w-full text-white"
              >
                Confirm & Pay
              </button>
            </div>
          </form>

          <div className="modal-action mt-4">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};
export default BilDetails;
