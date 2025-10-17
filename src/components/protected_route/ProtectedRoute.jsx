

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

const ProtectedRoute = ({ element,  }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

    // Wait until we know if user is logged in
  if (loading) return <div style={{display: "flex", height:"100vh", width:"100%", backgroundColor:"blue"}}>Loading...</div>;


  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;

