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
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/api/products/products'); // Fetch user-specific products
          console.log('Products fetched:', response.data);
          setProducts(response.data.products || response.data);
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

  const handleSold = (product) => {
    setCurrentProductId(product._id);
  };

  const confirmSold = async () => {
    const selectedProduct = products.find((product) => product._id === currentProductId);
    if (!selectedProduct || soldQuantity <= 0 || soldQuantity > selectedProduct.quantity) return;

    const updatedQuantity = selectedProduct.quantity - soldQuantity;
    const profit = (selectedProduct.sellingPrice - selectedProduct.purchasePrice) * soldQuantity;

    try {
      await api.put(`/api/products/sell/${currentProductId}`, { quantity: updatedQuantity });
      setProducts(
        products.map((product) =>
          product._id === currentProductId ? { ...product, quantity: updatedQuantity } : product
        )
      );
      alert(`Profit: $${profit}`);
      setSoldQuantity(0);
      setCurrentProductId(null);
    } catch (error) {
      console.error('Error updating sold product:', error);
    }
  };

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
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Purchase Price</th>
              <th className="py-3 px-6">Selling Price</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <img src={`http://localhost:5000/${product.image}` || 'https://via.placeholder.com/100'} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.description}</td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6">{product.quantity}</td>
                <td className="py-4 px-6">${product.purchasePrice}</td>
                <td className="py-4 px-6">${product.sellingPrice}</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-4">
                    <Link to={`/products/edit/${product._id}`}>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    <button onClick={() => handleSold(product)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sold</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {currentProductId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Enter Quantity Sold</h3>
            <input
              type="number"
              min="1"
              max={products.find((p) => p._id === currentProductId)?.quantity}
              value={soldQuantity}
              onChange={(e) => setSoldQuantity(parseInt(e.target.value))}
              className="border p-2 mb-4 w-full"
            />
            <button onClick={confirmSold} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm</button>
            <button onClick={() => setCurrentProductId(null)} className="px-4 py-2 bg-gray-300 rounded ml-4">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
