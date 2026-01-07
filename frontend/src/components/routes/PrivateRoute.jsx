import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { UserRole } from "../../types";
import { normalizeRole } from "../../services/shared/normalize";

export const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
  const normalizedRole = normalizeRole(user?.role);

  if (isAuthLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && normalizedRole !== role && normalizedRole !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
