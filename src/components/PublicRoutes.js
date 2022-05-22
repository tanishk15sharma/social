import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserTokenFromLocalStorage } from "../features/authSlice";

const PublicRoutes = () => {
  const token = getUserTokenFromLocalStorage();
  return <div>{!token ? <Outlet /> : <Navigate to="/" />}</div>;
};

export { PublicRoutes };
