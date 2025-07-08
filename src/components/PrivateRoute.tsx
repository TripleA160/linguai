import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const PrivateRoute = ({ element: Element }: { element: JSX.Element }) => {
  const { currentUser } = useAuth();

  return currentUser ? Element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
