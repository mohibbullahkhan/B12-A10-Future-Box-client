import React from "react";
import { FaGasPump, FaWater } from "react-icons/fa";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { TbSunElectricity } from "react-icons/tb";
import { Link } from "react-router";

const categories = [
  {
    name: "Electricity",
    description: "Manage your electricity bills",
    icon: <TbSunElectricity size={40} />,
    bgColor: "bg-amber-200",
  },
  {
    name: "Water",
    description: "Track your water usage",
    icon: <FaWater size={40} />,
    bgColor: "bg-blue-200",
  },
  {
    name: "Gas",
    description: "Monitor your gas consumption",
    icon: <FaGasPump size={40} />,
    bgColor: "bg-orange-200",
  },
  {
    name: "Internet",
    description: "Pay your internet bills",
    icon: <MdSignalWifiStatusbarConnectedNoInternet4 size={40} />,
    bgColor: "bg-purple-200",
  },
];

const CategorySection = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Utility Categories
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We support all major utility bill types
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`block p-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] ${category.bgColor} `}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 ">{category.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-xl text-gray-600 text-center">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
