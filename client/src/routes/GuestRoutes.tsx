import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import { Spinner } from "../components";

export const GuestRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullscreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
