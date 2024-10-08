// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Create the Axios instance with configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json', // Set default content type for JSON
  },
});

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error messages

  const { email, password } = formData;
  const navigate = useNavigate();
  const { login } = useAuth(); // This will update the AuthContext when the user logs in

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    localStorage.clear(); // Clear any existing tokens before logging in

    e.preventDefault();
    try {
      // Make the POST request using the Axios instance
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store JWT token
      login(response.data.token); // Update authentication context with the token

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // Handle errors and display appropriate error messages
      console.error('Login error:', err.response?.data || err.message); // Log full error response for debugging
      setErrorMessage(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded-md">
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
