// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for the token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function to set authentication status and store the token
  const login = (token) => {
    localStorage.setItem('token', token); // Store token in local storage
    setIsAuthenticated(true);
    console.log('User logged in'); // Debug log
  };

  // Logout function to clear the token and update authentication status
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false);
    console.log('User logged out'); // Debug log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
