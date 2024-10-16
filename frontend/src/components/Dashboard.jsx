import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ProductList from './ProductList';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/api/products/products');
          console.log('Dashboard response:', response.data);
          
          if (response.data.success) {
            setProducts(response.data.products);
          } else {
            setError('Failed to fetch products');
          }
        } catch (err) {
          console.error('Failed to fetch dashboard data:', err);
          setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const outOfStockProducts = products.filter(product => product.quantity === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Product Management</h2>
            <Link to="/products/add">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Add New Product
              </button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <ProductList products={products} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <p className="text-gray-600">Total Products: {products.length}</p>
            {outOfStockProducts.length > 0 && (
              <div className="mt-4">
                <p className="text-red-600 font-semibold">Out of Stock Products:</p>
                <ul className="list-disc list-inside">
                  {outOfStockProducts.map(product => (
                    <li key={product._id} className="text-gray-600">
                      {product.name} (Quantity: {product.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <p className="text-gray-600">No recent activity</p>
            {/* Add recent activity list here when implemented */}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-blue-500 hover:underline">View All Products</Link></li>
              <li><a href="#" className="text-blue-500 hover:underline">Generate Report</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Update Inventory</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;