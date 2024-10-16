import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const [overallTotalSales, setOverallTotalSales] = useState(0);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToSell, setQuantityToSell] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    if (isAuthenticated) {
      try {
        const response = await api.get('/api/products/products');
        console.log('Products fetched:', response.data);
        setProducts(response.data.products || response.data);
        calculateOverallTotalSales(response.data.products || response.data);
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

  const calculateOverallTotalSales = (productList) => {
    const total = productList.reduce((sum, product) => sum + product.totalSales, 0);
    setOverallTotalSales(total);
  };

  const handleSellClick = (product) => {
    setSelectedProduct(product);
    setQuantityToSell(1);
    setShowSellModal(true);
  };

  const handleSellConfirm = async () => {
    if (selectedProduct.quantity < quantityToSell) {
      alert('Not enough quantity available.');
      return;
    }

    try {
      const response = await api.put(`/api/products/sell/${selectedProduct._id}`, { 
        quantitySold: quantityToSell
      });

      if (response.data.success) {
        const updatedProduct = response.data.product;
        const updatedProducts = products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
        setProducts(updatedProducts);
        calculateOverallTotalSales(updatedProducts);
        alert(`Sale confirmed. Amount: $${selectedProduct.sellingPrice * quantityToSell}`);
        setShowSellModal(false);
      } else {
        throw new Error(response.data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating sold product:', error.response?.data || error.message);
      alert('Failed to update product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
        calculateOverallTotalSales(updatedProducts);
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
      <div className="mb-4 text-xl font-semibold text-green-600">
        Overall Total Sales: ${overallTotalSales.toFixed(2)}
      </div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Purchase Price</th>
              <th className="py-3 px-6 text-left">Selling Price</th>
              <th className="py-3 px-6 text-left">Total Sales</th>
              <th className="py-3 px-6 text-left">Actions</th>
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
                <td className="py-4 px-6">${product.totalSales.toFixed(2)}</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-4">
                    <Link to={`/products/edit/${product._id}`}>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    <button onClick={() => handleSellClick(product)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sell</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showSellModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Sell Product</h3>
            <p className="mb-4">Product: {selectedProduct.name}</p>
            <p className="mb-4">Available Quantity: {selectedProduct.quantity}</p>
            <input
              type="number"
              value={quantityToSell}
              onChange={(e) => setQuantityToSell(Math.max(1, parseInt(e.target.value)))}
              className="w-full p-2 mb-4 border rounded"
              min="1"
              max={selectedProduct.quantity}
            />
            <div className="flex justify-end">
              <button onClick={() => setShowSellModal(false)} className="px-4 py-2 bg-gray-300 text-black rounded mr-2">Cancel</button>
              <button onClick={handleSellConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm Sale</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;