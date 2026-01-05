import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { UserRole } from "../../types";

export const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role && user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
