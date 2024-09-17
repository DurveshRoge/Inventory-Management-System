import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-4">
        <Link to="/products/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add New Product</button>
        </Link>
      </div>
      <ProductList />
    </div>
  );
};

export default Dashboard;
