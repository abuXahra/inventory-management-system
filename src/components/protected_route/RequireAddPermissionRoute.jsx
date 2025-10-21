// components/protected_route/RequireAddPermissionRoute.jsx
import { Navigate } from "react-router-dom";

const RequireAddPermissionRoute = ({ user, moduleName, element, fallback = "/dashboard" }) => {
  const hasAddPermission = user?.permissions?.some(
    (perm) => perm.module === moduleName && perm.canAdd
  );

  if (user.role === "user" && !hasAddPermission) {
    return <Navigate to={fallback} replace />;
  }

  return element;
};

export default RequireAddPermissionRoute;
