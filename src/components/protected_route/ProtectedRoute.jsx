

// function ProtectedRoute({ element }) {
//   const { user } = useContext(UserContext);

//   if (!user) {
//     // If the user is not logged in, redirect to the login page
//     return <Navigate to="/" />;
//   }

//   return element;
// }

// export default ProtectedRoute;


// components/protected_route/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;

