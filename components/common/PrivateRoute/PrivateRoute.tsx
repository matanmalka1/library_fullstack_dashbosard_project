import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { UserRole } from "../../../types";

interface Props {
  children: React.ReactNode;
  role?: UserRole;
}

const PrivateRoute = ({ children, role }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role && user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
