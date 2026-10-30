
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isLoggedIn: boolean;
  isTokenChecked: boolean;
}

function PublicRoute({
  isLoggedIn,
  isTokenChecked,
}: PublicRouteProps) {
  if (!isTokenChecked) {
    return null;
  }

  return isLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
