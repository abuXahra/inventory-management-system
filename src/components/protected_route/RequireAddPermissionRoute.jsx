// // components/protected_route/RequireAddPermissionRoute.jsx
// import { Navigate } from "react-router-dom";

// const RequireAddPermissionRoute = ({ user, moduleName, element, fallback = "/dashboard" }) => {
//   const hasAddPermission = user?.permissions?.some(
//     (perm) => perm.module === moduleName && perm.canAdd);

//   if (user.role === "user" && !hasAddPermission) {
//     return <Navigate to={fallback} replace />;
//   }

//   return element;
// };

// export default RequireAddPermissionRoute;


import { Navigate } from "react-router-dom";

const RequirePermissionRoute = ({ user, moduleName, action, element, fallback = "/unauthorized" }) => {
  const hasPermission = user?.permissions?.some(
    (perm) => perm.module === moduleName && perm[action]
  );

  if (user.role === "user" && !hasPermission) {
    return <Navigate to={fallback} replace />;
  }

  return element;
};

export default RequirePermissionRoute;
