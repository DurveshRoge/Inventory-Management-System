// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const api = axios.create({
  baseURL: 'http://localhost:5000',
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        
        {error && (
          <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                required
                className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
            className={`w-full py-2 rounded-md text-white ${
              loading || passwordError !== '' ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            } transition-all duration-300 ease-in-out`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;