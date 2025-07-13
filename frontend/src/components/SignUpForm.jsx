// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
,
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!hasUpperCase) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else if (!hasLowerCase) {
      setPasswordError('Password must contain at least one lowercase letter');
    } else if (!hasNumber) {
      setPasswordError('Password must contain at least one number');
    } else if (!hasSpecialChar) {
      setPasswordError('Password must contain at least one special character');
    } else {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setError('Please fix the password issues before submitting');
      return;
    }
    setLoading(true);
    setError('');

    try {
      console.log("Submitting data:", formData);
      const res = await api.post('/api/auth/register', formData);
      console.log("Response data:", res.data);

      localStorage.setItem('token', res.data.token);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error occurred:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Server Error');
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 pt-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Sign Up</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
              {error}
            </div>
          )}
  
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>
  
            <button
              type="submit"
              disabled={loading || passwordError !== ''}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                loading || passwordError !== '' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-800">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };
export default SignUp;