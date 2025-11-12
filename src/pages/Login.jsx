import React, { use, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthContext";

const Login = () => {
  const { signIn, forgetPassword, setUser, signInGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Logged in Successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed. Check your email or password.");
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }

    forgetPassword(email)
      .then(() => {
        toast.info("Password reset link sent! Check your email.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage || "Failed to send reset email.");
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
      <div className="flex flex-col lg:flex-row-reverse max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 lg:p-12 lg:w-1/2 bg-teal-600 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Welcome Back!
          </h1>
          <p className="text-teal-100 text-lg">
            Log in to manage your pet's appointments and services.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login Now
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={emailRef}
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
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline transition duration-150"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-2.5 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300 transform hover:scale-[1.005]"
            >
              Login
            </button>
            <button
              onClick={handleGoogleSingIn}
              className="w-full py-2.5 flex items-center justify-center space-x-2 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 cursor-pointer"
            >
              <FcGoogle size={24} /> <span>Sign In With Google</span>
            </button>
            <p className="font-medium text-center pt-5 text-gray-600">
              Don't Have An Account?{" "}
              <Link
                className="text-teal-600 hover:underline font-semibold"
                to="/register"
              >
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
