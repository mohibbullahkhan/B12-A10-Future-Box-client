import React from "react";
import { Link } from "react-router";

const BillCard = ({ card }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <figure>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-56 object-cover"
        />
      </figure>
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
          {card.title}
        </h2>

        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center space-x-2">
            <span className="font-semibold text-blue-600">Category:</span>
            <span>{card.category}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="font-semibold text-blue-600">Location:</span>
            <span>{card.location}</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="font-semibold text-blue-600">Date:</span>
            <span>{card.date}</span>
          </p>
        </div>

        <div className="pt-2">
          <Link
            to={`/bilDetails/${card._id}`}
            className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
