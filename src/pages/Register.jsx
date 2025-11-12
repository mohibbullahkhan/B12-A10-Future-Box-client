import React, { use, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
// import { AuthContext } from "../Provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthContext";

const Register = () => {
  const { setUser, createUser, updateUser, signInGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least one uppercase letter and one lowercase letter"
      );
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Registration Successful!");
          })
          .catch((error) => {
            console.error(error);
            setUser(user);
            toast.error("Profile update failed.");
          });
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed.");
      });
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSingIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location.state ? location.state : "/");
        toast.success("Signed in with Google!");
      })
      .catch((e) => {
        toast.error(e.message || "Google sign-in failed.");
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 lg:p-12 lg:w-1/2 bg-teal-600 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Join Our Cozy Crew!
          </h1>
          <p className="text-teal-100 text-lg">
            Create your account to unlock premium winter pet care services.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Register Now
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                placeholder="Profile Picture URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400 hover:text-teal-600 transition duration-150"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300 transform hover:scale-[1.005] cursor-pointer"
            >
              Register Account
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="relative flex justify-center items-center">
              <div className="absolute w-full border-t border-gray-300"></div>
              <p className="relative bg-white px-2 text-sm text-gray-500">OR</p>
            </div>
            <button
              onClick={handleGoogleSingIn}
              className="w-full py-2.5 flex items-center justify-center space-x-2 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 cursor-pointer"
            >
              <FcGoogle size={24} /> <span>Sign Up With Google</span>
            </button>
          </div>

          <p className="font-medium text-center pt-5 text-gray-600">
            Already Have An Account?{" "}
            <Link
              className="text-teal-600 hover:underline font-semibold"
              to="/login"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
