// src/components/ProtectedPage.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the authentication state from context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
