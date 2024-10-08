import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach JWT token
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/api/products/products'); // Fetch user-specific products
          console.log('Products fetched:', response.data);

          if (response.data.products) {
            setProducts(response.data.products);
          } else {
            setProducts(response.data);
          }
        } catch (err) {
          console.error('Error fetching products:', err.response ? err.response.data : err);
          setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="main-content p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Image</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Description</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Category</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Quantity</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Purchase Price</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Selling Price</th>
              <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b border-gray-200">
                  <img
                    src={product.image || 'https://via.placeholder.com/100'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{product.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{product.description}</td>
                <td className="py-4 px-6 border-b border-gray-200">{product.category}</td>
                <td className="py-4 px-6 border-b border-gray-200">{product.quantity}</td>
                <td className="py-4 px-6 border-b border-gray-200">${product.purchasePrice}</td>
                <td className="py-4 px-6 border-b border-gray-200">${product.sellingPrice}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <Link to={`/products/edit/${product._id}`}>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
