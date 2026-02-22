import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import { Spinner } from "../components";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullscreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
