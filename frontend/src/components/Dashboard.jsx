// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ProductList from './ProductList';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('http://localhost:5000/api/products/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          
          console.log('Dashboard response:', response.data);
          
          if (response.data.success) {
            setProducts(response.data.products);
          } else {
            setError(err.response?.data?.message || 'Failed to fetch products');
          }
        } catch (err) {
          console.error('Failed to fetch dashboard data:', err);
          setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Stop loading if not authenticated
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-4">
        <Link to="/products/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add New Product</button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Dashboard;
