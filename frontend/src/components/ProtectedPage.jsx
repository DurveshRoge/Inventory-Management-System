import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the authentication state from context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading until authentication state is determined
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the child components if authenticated
  return children; 
};

export default ProtectedRoute;
