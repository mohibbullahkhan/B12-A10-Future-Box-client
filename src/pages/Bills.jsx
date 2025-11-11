import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BilCard from "../components/BilCard";

const allCategories = [
  "All Categories",
  "Electricity",
  "Water",
  "Gas",
  "Internet",
];

const Bills = () => {
  const axiosSecure = useAxiosSecure();
  const [bil, setBil] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredBills = async () => {
      setIsLoading(true);

      const queryString =
        selectedCategory === "All Categories"
          ? "/bills"
          : `/bills?category=${selectedCategory}`;

      try {
        const response = await axiosSecure.get(queryString);
        setBil(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredBills();
  }, [axiosSecure, selectedCategory]);

  const CategoryFilterDropdown = () => (
    <div className="flex items-center justify-end mb-8">
      <span className="text-base text-gray-700 mr-3">Filter by Category:</span>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={isLoading}
        className="appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 shadow-sm cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B7280' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        {allCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <div className="text-center">
        {" "}
        <h2 className="text-4xl font-bold text-gray-800 mb-2">All Bills</h2>
        <p className="text-lg text-gray-600 mb-12">
          Browse and view all available utility bills
        </p>
      </div>

      <div className="md:flex justify-between text-center space-y-2">
        <p className="">Showing {bil.length} bills</p>
        <CategoryFilterDropdown />
      </div>

      <div className="grid gap-6 max-sm:mx-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <p className="col-span-full text-center text-lg text-gray-500">
            Loading bills...
          </p>
        )}
        {!isLoading && bil.length === 0 && (
          <p className="col-span-full text-center text-lg text-gray-500">
            No bills found for this category.
          </p>
        )}
        {!isLoading &&
          bil.map((card) => <BilCard key={card._id} card={card} />)}
      </div>
    </div>
  );
};

export default Bills;
