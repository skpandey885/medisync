import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext"; // Adjust the path as per your project structure

const ProtectedRoute = () => {
  const { isAdmin } = useAuth();

  return isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
