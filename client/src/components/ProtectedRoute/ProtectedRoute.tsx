
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  isTokenChecked: boolean;
}

function ProtectedRoute({
  isLoggedIn,
  isTokenChecked,
}: ProtectedRouteProps) {
  if (!isTokenChecked) {
    return null;
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
