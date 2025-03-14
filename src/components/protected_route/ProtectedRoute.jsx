import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function ProtectedRoute({ element }) {
  const { user } = useContext(UserContext);

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }

  return element;
}

export default ProtectedRoute;
