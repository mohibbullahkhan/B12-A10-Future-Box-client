import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FcPaid } from "react-icons/fc";

import { FiDownload } from "react-icons/fi";
import dayjs from "dayjs";
import { TbSum } from "react-icons/tb";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

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
                      disabled
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
    </div>
  );
};

export default MyPayBills;
