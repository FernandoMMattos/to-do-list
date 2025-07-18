import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import type { JSX } from "react";

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
