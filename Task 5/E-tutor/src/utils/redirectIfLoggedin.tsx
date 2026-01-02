import { Navigate } from "react-router";
import { PageRoutes } from "../enum/routes";

import { UseAuth } from "../hooks/useAuth";

const RedirectIfLoggedin = ({ children }: { children: React.ReactNode }) => {
  const { user: userData } = UseAuth();

  if (userData) {
    return <Navigate to={PageRoutes.HOME} replace />;
  }
  return children;
};

export default RedirectIfLoggedin;
