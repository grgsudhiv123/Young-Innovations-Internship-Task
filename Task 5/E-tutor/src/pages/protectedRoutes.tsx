import { PageRoutes } from "../enum/routes";
import { UseAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    toast.info("loading...");
  }

  if (!user) {
    toast.error("User is not logged in");
    return <Navigate to={PageRoutes.SIGNIN} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
