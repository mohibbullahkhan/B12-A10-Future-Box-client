import React, { use, useEffect, useState } from "react";

import { NavLink, Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("You Logged Out Successfully");
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        toast(error.message || "Logout failed");
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getInitial = (displayName) => {
    if (!displayName) return "U";
    const parts = displayName.trim().split(" ");
    if (parts.length > 1) {
      return (
        parts[0].charAt(0).toUpperCase() +
        parts[parts.length - 1].charAt(0).toUpperCase()
      );
    }
    return parts[0].charAt(0).toUpperCase();
  };

  const getNavLinkClass = ({ isActive }) =>
    `font-semibold px-2 py-1 transition duration-200 ${
      isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm transition duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink className={getNavLinkClass} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={getNavLinkClass} to="/bills">
          Bills
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className={getNavLinkClass} to="/myBills">
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  const MobileDropdownLinks = (
    <div className="pb-3 pt-2 space-y-1 bg-white">
      {/* Mobile Nav Links */}
      <NavLink
        to="/"
        onClick={() => setIsMobileMenuOpen(false)}
        className={mobileLinkClass}
      >
        Home
      </NavLink>
      <NavLink
        to="/bills"
        onClick={() => setIsMobileMenuOpen(false)}
        className={mobileLinkClass}
      >
        Bills
      </NavLink>
      {user && (
        <NavLink
          to="/myBills"
          onClick={() => setIsMobileMenuOpen(false)}
          className={mobileLinkClass}
        >
          My Pay Bills
        </NavLink>
      )}

      {/* Mobile Auth Buttons/Logout in Dropdown */}
      <div className="pt-2 border-t border-gray-100 mx-4">
        {user ? (
          <button
            onClick={handleLogOut}
            className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 mb-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="shadow-sm border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
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
              <span className="text-xl font-bold text-gray-800">
                Utility Pay
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex space-x-6">{navLinks}</ul>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  className="hidden lg:inline-block px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  type="button"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle"
                />
                <div className="relative group cursor-pointer">
                  {user.photoURL ? (
                    <img
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold text-lg cursor-pointer`}
                    >
                      {getInitial(user.displayName).slice(0, 2)}
                    </div>
                  )}
                  <span className="absolute top-full right-1/2 translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg z-20">
                    {user.displayName || "User"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen border-t border-gray-200" : "max-h-0"
        }`}
      >
        {MobileDropdownLinks}
      </div>
    </div>
  );
};

export default Navbar;
