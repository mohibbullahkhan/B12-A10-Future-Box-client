import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    updateUser,
    forgetPassword,
    logOut,
    signInGoogle,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
