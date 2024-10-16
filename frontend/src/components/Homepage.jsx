// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 pt-20 text-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-6 text-indigo-800">Welcome to the Inventory Management System</h1>
        <p className="mb-8 text-xl text-gray-700">
          Manage your products, track sales, and stay updated with inventory alerts.
        </p>

        {/* Features Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
            <li className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-500 mr-2">✔️</span>
              <span className="text-gray-800">Easy Product Management</span>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-500 mr-2">✔️</span>
              <span className="text-gray-800">Sales and Tracking</span>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-500 mr-2">✔️</span>
              <span className="text-gray-800">Low Stock Alerts</span>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-500 mr-2">✔️</span>
              <span className="text-gray-800">User-Friendly Interface</span>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-500 mr-2">✔️</span>
              <span className="text-gray-800">Secure User Authentication</span>
            </li>
          </ul>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signup">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 text-lg font-semibold">
              Create an Account
            </button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 text-lg font-semibold">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
