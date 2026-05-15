import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuths";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}