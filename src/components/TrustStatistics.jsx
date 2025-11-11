import React from "react";
import { FaUserFriends, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { IoRibbonOutline } from "react-icons/io5";

const statistics = [
  {
    icon: <FaUserFriends />,
    value: "10,000+",
    label: "Active Users",
  },
  {
    icon: <FaCheckCircle />,
    value: "50,000+",
    label: "Bills Paid",
  },
  {
    icon: <IoRibbonOutline />,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: <FaShieldAlt />,
    value: "100%",
    label: "Secure",
  },
];

const TrustStatistics = () => {
  return (
    <div className="py-20 text-white bg-gradient-to-r from-blue-600 to-purple-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
        <p className="text-xl mb-16 opacity-90">
          Join our growing community of satisfied users
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {statistics.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-base font-medium opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStatistics;
