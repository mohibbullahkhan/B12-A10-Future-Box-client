import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#1a1f33] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">
          {/* Company Info / Logo Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">UtilityPay</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Your trusted utility bill management system. Easily track, manage,
              and pay your electricity, water, gas, and internet bills all in
              one place. Simplify your life with UtilityPay.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition duration-200"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition duration-200"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition duration-200"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/bills"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Bills
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 UtilityPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
