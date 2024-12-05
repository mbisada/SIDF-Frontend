/* import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CustomerContext } from "../../contexts/CustomerContext/CustomerContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const customerContext = React.useContext(CustomerContext);
  const location = useLocation();

  if (!customerContext?.customer || !customerContext.customer.checksum) {
    // Redirect to login and store the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
 */
 

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CustomerContext } from "../../contexts/CustomerContext/CustomerContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string; // Add requiredRole prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const customerContext = React.useContext(CustomerContext);
  const location = useLocation();

  console.log('here ', customerContext)
  // Check if customer exists and has a valid checksum
  if (!customerContext?.customer || !customerContext.customer.checksum) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user's role matches the required role
  if (customerContext.customer.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />; // Redirect to unauthorized page
  }

  return <>{children}</>;
};

export default ProtectedRoute; 