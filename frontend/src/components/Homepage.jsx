// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20 text-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Inventory Management System</h1>
        <p className="mb-6 text-lg">
          Manage your products, track sales, and stay updated with inventory alerts.
        </p>

        {/* Features Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside inline-block text-left">
            <li className="mb-2">✔️ Easy Product Management</li>
            <li className="mb-2">✔️ Sales Tracking and Reports</li>
            <li className="mb-2">✔️ Low Stock Alerts</li>
            <li className="mb-2">✔️ User-Friendly Interface</li>
            <li className="mb-2">✔️ Secure User Authentication</li>
          </ul>
        </div>

        {/* Call to Action Section */}
        <div className="flex justify-center space-x-4">
          <Link to="/signup">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg">Create an Account</button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
