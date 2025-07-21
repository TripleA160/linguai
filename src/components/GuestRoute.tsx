import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
