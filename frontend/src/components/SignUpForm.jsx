import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this matches your backend URL
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // To indicate loading state
  const [error, setError] = useState(''); // To store error messages

  const { name, email, password } = formData;
  const navigate = useNavigate();

  // Function to update form state on input change
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      console.log("Submitting data:", formData); // Debugging statement
      const res = await api.post('/api/auth/register', formData);
      console.log("Response data:", res.data); // Debugging statement

      // Optional: Store JWT token in localStorage (if needed)
      // localStorage.setItem('token', res.data.token);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error("Error occurred:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Server Error'); // Show error message to user
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        
        {/* Display error message if any */}
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
            disabled={loading} // Disable button when loading
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition-all duration-300 ease-in-out`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
