import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://utility-bill-management-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // 🏆 THE FIX: Use optional chaining to safely get the token
      const token = user?.accessToken; // user will be null initially, but this prevents a crash
      if (token) {
        // 👈️ Only proceed if the token actually exists
        config.headers.authorization = `Bearer ${token}`;
        console.log(config.headers);
      }
      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  // ... (Your fix from before)
  return instance;
};

export default useAxiosSecure;
