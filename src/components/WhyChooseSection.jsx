import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoShieldOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";

const features = [
  {
    title: "Easy Bill Management",
    description:
      "View and manage all your utility bills in one centralized dashboard",
    icon: <FaRegCheckCircle className="text-3xl text-green-500" />,
  },
  {
    title: "Secure Payments",
    description: "Pay your bills securely with our encrypted payment system",
    icon: <IoShieldOutline className="text-3xl text-blue-500" />,
  },
  {
    title: "Real-time Updates",
    description:
      "Get instant updates on your bill status and payment confirmations",
    icon: <AiOutlineClockCircle className="text-3xl text-orange-500" />,
  },
  {
    title: "Usage Analytics",
    description: "Track your utility usage patterns and optimize spending",
    icon: <FiTrendingUp className="text-3xl text-purple-500" />,
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Why Choose UtilityPay?
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Comprehensive solution for managing all your utility bills
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition duration-300 h-full text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
