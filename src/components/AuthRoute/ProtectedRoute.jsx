import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  // ! Check if user is login
  const { userAuth } = useSelector((state) => state.users);
  //   get access_token
  const isLogin = userAuth?.userInfo?.data?.access_token;
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
};
