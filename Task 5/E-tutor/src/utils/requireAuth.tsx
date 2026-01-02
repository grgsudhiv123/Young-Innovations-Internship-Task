import { Navigate } from "react-router";
import { UseAuth } from "../hooks/useAuth";
import type { UserRoleType } from "./constants/userrole.constants";
import { PageRoutes } from "../enum/routes";
import { toast } from "react-toastify";

const RequireAuth = ({
  children,
  validUsers,
}: {
  children: React.ReactNode;
  validUsers: UserRoleType[];
}) => {
  const { user } = UseAuth();

  if (user?.user_metadata.role) {
    const userRole = user?.user_metadata.role;
    if (validUsers.length > 0) {
      if (validUsers.includes(userRole)) {
        console.log(`${userRole} is a valid user`);
      } else {
        console.log(`${userRole} cant access the current route`);
        toast.error(`${userRole} cant access the current route`);
        return <Navigate to={PageRoutes.HOME} replace />;
      }
    }
  }

  return children;
};

export default RequireAuth;
