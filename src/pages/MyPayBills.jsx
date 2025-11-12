import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FcPaid } from "react-icons/fc";

import { FiDownload } from "react-icons/fi";
import dayjs from "dayjs";
import { TbSum } from "react-icons/tb";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const bilModalRef = useRef(null);
  const [currentBillToEdit, setCurrentBillToEdit] = useState(null);
  // --- Data Fetching ---
  const fetchBills = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/myBills?email=${user.email}`);
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching paid bills:", error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [user, axiosSecure]);

  // --- Calculations ---
  const totalBillsPaid = bills.length;
  const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

  const handleDownloadReport = () => {
    if (bills.length === 0) {
      Swal.fire("Info", "No paid bills to report.", "info");
      return;
    }

    try {
      const doc = new jsPDF();
      const currentDate = dayjs().format("MMM D, YYYY");

      // --- 1. Report Header ---
      doc.setFontSize(16);
      doc.text("Utility Bill Payment History Report", 14, 20);

      doc.setFontSize(10);
      doc.text(`User: ${user?.email || "N/A"}`, 14, 28);
      doc.text(`Report Date: ${currentDate}`, 14, 33);

      // Display Totals as required by assignment
      doc.setFontSize(12);
      doc.text(`Total Bills Paid: ${totalBillsPaid}`, 14, 42);
      doc.text(`Total Amount: ৳${totalAmount.toFixed(2)}`, 60, 42);

      // --- 2. Define Table Data ---
      const head = [
        ["Username", "Email", "Amount", "Phone", "Address", "Date Paid"],
      ];

      // Map the bill data to the body array
      const body = bills.map((bill) => [
        bill.username,
        bill.email,
        `৳${bill.amount.toFixed(2)}`,
        bill.phone,
        bill.address,
        dayjs(bill.datePaid).format("YYYY-MM-DD"),
      ]);

      // --- 3. Generate Table using autoTable ---
      autoTable(doc, {
        head: head,
        body: body,
        startY: 50, // Start table below the total stats
        theme: "striped",
        headStyles: {
          fillColor: [52, 58, 64], // A nice dark gray to match your UI
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: {
          2: { fontStyle: "bold" }, // Bold the Amount column
        },
      });

      // 4. Save the PDF
      const userPrefix = user?.email ? user.email.split("@")[0] : "report";
      doc.save(`${userPrefix}_paid_bills_${dayjs().format("YYYYMMDD")}.pdf`);

      Swal.fire(
        "Success",
        "Your payment report has been downloaded!",
        "success"
      );
    } catch (error) {
      console.error("PDF Generation Failed:", error);
      Swal.fire(
        "Report Error",
        "Failed to generate PDF. Check console for details.",
        "error"
      );
    }
  };

  const handleDeleteBill = (billid) => {
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
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your bill has been deleted.", "success");
              // Update state to remove deleted item
              setBills(bills.filter((bill) => bill._id !== billid));
            } else {
              Swal.fire("Error", "Could not delete the item.", "error");
            }
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire(
              "Error",
              "Deletion failed due to a server issue.",
              "error"
            );
          });
      }
    });
  };

  const handleUpdateBill = (bill) => {
    setCurrentBillToEdit(bill); // Set the specific bill data
    bilModalRef.current.showModal();
  };
  // ... after handleBillSubmit
  const handleBillUpdateSubmit = (e) => {
    e.preventDefault();

    const id = currentBillToEdit._id; // Get the ID from the state

    const updatedBillData = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      amount: parseFloat(e.target.amount.value),
      datePaid: e.target.date.value, // Changed from 'date' to 'datePaid' to match the PUT logic's $set
      additionalInfo: e.target.additionalInfo.value,
      // Note: billId and status are typically not changed in a simple update
    };

    axiosSecure
      .put(`/myBills/${id}`, updatedBillData) // Use PUT method
      .then((res) => {
        if (res.data.success) {
          toast.success("Bill successfully updated!");
          bilModalRef.current.close();
          fetchBills(); // Re-fetch the data to update the table
        } else {
          toast.error("Failed to update bill.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred during bill update.");
        console.error("Error updating bill:", error);
      });
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
      billId: "PLACEHOLDER_NEW_BILL_ID",
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
          fetchBills(); // Re-fetch the data to include the new paid bill
        } else {
          toast.error("Failed to record payment.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred during payment submission.");
        console.error("Error creating new bill:", error);
      });
  };

  // const handleBillSubmit = (e) => {
  //   e.preventDefault();

  //   const username = e.target.username.value;
  //   const email = e.target.email.value;
  //   const phone = e.target.phone.value;
  //   const address = e.target.address.value;
  //   const amount = parseFloat(e.target.amount.value);
  //   const date = e.target.date.value;
  //   const additionalInfo = e.target.additionalInfo.value;

  //   const newBillData = {
  //     billId: bills._id,
  //     username: username,
  //     phone: phone,
  //     address: address,
  //     email: email,
  //     amount: amount,
  //     datePaid: date,
  //     additionalInfo: additionalInfo,
  //     status: "Paid",
  //   };

  //   axiosSecure
  //     .post("/myBills", newBillData)
  //     .then((res) => {
  //       if (res.data.insertedId) {
  //         toast.success("Bill successfully paid and recorded!");
  //         bilModalRef.current.close();
  //       } else {
  //         toast.error("Failed to record payment.");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("An error occurred during payment submission.");
  //       console.error("Error creating new bill:", error);
  //     });
  // };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="text-center py-16 text-xl">
        Loading Payment History...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Pay Bills</h1>
          <p className="text-gray-500">View and manage your payment history</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="btn btn-sm bg-gray-600 text-white hover:bg-gray-700 border-none"
        >
          <FiDownload className="h-4 w-4" />
          Download Report
        </button>
      </div>

      {/* Total Paid / Total Amount Cards (Matching Screenshot Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Total Bills Paid</p>
            <h2 className="text-4xl font-bold mt-1">{totalBillsPaid}</h2>
          </div>
          {/* Placeholder icon */}
          <FcPaid size={40} />
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Total Amount</p>
            <h2 className="text-4xl font-bold mt-1">
              ৳{totalAmount.toFixed(2)}
            </h2>
          </div>
          {/* Placeholder icon */}
          <TbSum size={40} />
        </div>
      </div>

      {/* Conditional Display: No Payments vs. Table */}
      {totalBillsPaid === 0 ? (
        // No Payments Yet - Matching Screenshot Design
        <div className="bg-white p-16 text-center rounded-lg shadow-xl mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-2h4v2zm0-4h-4v-2h4v2zm4-4H6V7h12v2z" />
          </svg>
          <p className="text-xl font-semibold mt-4 text-gray-700">
            No Payments Yet
          </p>
          <p className="text-gray-500">You haven't paid any bills yet.</p>
          <a href="/bills" className="btn btn-primary mt-6">
            Browse Bills
          </a>
        </div>
      ) : (
        // Payments Table
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-xl mt-8">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Bill ID</th>
                <th className="py-3 px-6 text-left">User/Address</th>
                <th className="py-3 px-6 text-center">Amount</th>
                <th className="py-3 px-6 text-center">Phone</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-gray-600 text-sm font-light">
              {bills.map((bill) => (
                <tr
                  key={bill._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6 text-left font-medium">
                    {bill.billId?.slice(0, 8)}...
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="font-medium">{bill.username}</div>
                    <div className="text-xs opacity-70">{bill.address}</div>
                  </td>
                  <td className="py-3 px-6 text-center font-bold text-green-600">
                    ৳{bill.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-center">{bill.phone}</td>
                  <td className="py-3 px-6 text-center">
                    {dayjs(bill.datePaid).format("MMM D, YYYY")}
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    {/* Update Button (Placeholder - Required but logic is complex for simple table) */}
                    <button
                      className="btn btn-sm btn-ghost text-blue-500 hover:text-blue-700"
                      onClick={() => handleUpdateBill(bill)}
                    >
                      Update
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteBill(bill._id)}
                      className="btn btn-sm btn-ghost text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog
        ref={bilModalRef}
        onClose={() => setCurrentBillToEdit(null)}
        className="modal modal-bottom sm:modal-middle"
      >
        {currentBillToEdit && (
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-center text-blue-600">
              {currentBillToEdit
                ? "Update Bill Details"
                : "Submit Payment Details"}
            </h3>
            <p className="py-4 text-center">
              {currentBillToEdit
                ? "Modify the necessary details for this payment record."
                : "Confirm your personal details to proceed with the bill payment."}
            </p>

            {/* Conditional Form Submission Handler */}
            <form
              onSubmit={
                currentBillToEdit ? handleBillUpdateSubmit : handleBillSubmit
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bill ID (Read-only) - Use currentBillToEdit's _id or billId */}
                <div>
                  <label className="label">Bill ID</label>
                  <input
                    type="text"
                    name="billId"
                    className="input input-bordered w-full"
                    readOnly
                    defaultValue={currentBillToEdit?._id || bills._id}
                  />
                </div>

                {/* Amount (Editable) */}
                <div>
                  <label className="label">Amount</label>
                  <input
                    type="number" // Changed to number for amount
                    name="amount"
                    className="input input-bordered w-full font-bold text-lg"
                    // Set default value dynamically
                    defaultValue={currentBillToEdit?.amount || bills.amount}
                    required
                  />
                </div>

                {/* Username (Read-only for consistency) */}
                <div>
                  <label className="label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="input input-bordered w-full"
                    readOnly
                    defaultValue={
                      currentBillToEdit?.username || user?.displayName || "N/A"
                    }
                  />
                </div>

                {/* Email (Read-only for consistency) */}
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    readOnly
                    defaultValue={
                      currentBillToEdit?.email || user?.email || "N/A"
                    }
                  />
                </div>

                {/* Phone (Editable) */}
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
                    // Set default value dynamically
                    defaultValue={currentBillToEdit?.phone || ""}
                  />
                </div>

                {/* Address (Editable) */}
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
                    // Set default value dynamically
                    defaultValue={currentBillToEdit?.address || ""}
                  />
                </div>

                {/* Date (Editable) */}
                <div className="col-span-1">
                  <label className="label">Payment Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full"
                    required
                    // Set default value dynamically, must be formatted to "YYYY-MM-DD" for type="date"
                    defaultValue={
                      currentBillToEdit?.datePaid
                        ? dayjs(currentBillToEdit.datePaid).format("YYYY-MM-DD")
                        : dayjs().format("YYYY-MM-DD")
                    }
                  />
                </div>

                {/* Additional info (Editable) */}
                <div className="col-span-full">
                  <label className="label">Additional Info (Optional)</label>
                  <textarea
                    name="additionalInfo"
                    className="textarea textarea-bordered w-full"
                    placeholder="Any specific instructions or notes"
                    // Set default value dynamically
                    defaultValue={currentBillToEdit?.additionalInfo || ""}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className={`btn w-full text-white ${
                    currentBillToEdit ? "btn-info" : "btn-success"
                  }`}
                >
                  {currentBillToEdit ? "Save Changes" : "Confirm & Pay"}
                </button>
              </div>
            </form>

            <div className="modal-action mt-4">
              <form method="dialog">
                {/* Reset currentBillToEdit when closing */}
                <button
                  // onClick={() => setCurrentBillToEdit(null)}
                  className="btn btn-sm btn-ghost"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MyPayBills;
