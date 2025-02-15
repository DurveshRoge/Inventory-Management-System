import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: process.env.BASE_URL ,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const [overallTotalSales, setOverallTotalSales] = useState(0);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToSell, setQuantityToSell] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    calculateOverallTotalSales(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products/products');
      console.log('Products fetched:', response.data);
      const fetchedProducts = response.data.products || response.data;
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      calculateOverallTotalSales(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err.response ? err.response.data : err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
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
        setFilteredProducts(updatedProducts);
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
        setFilteredProducts(updatedProducts);
        calculateOverallTotalSales(updatedProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-purple-600">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-xl mt-10">{error}</div>;

  return (
    <div className="main-content p-6 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-purple-800 text-center">Product Inventory</h2>
      <div className="mb-6 text-2xl font-semibold text-green-600 bg-white p-4 rounded-lg shadow-md text-center">
        Overall Total Sales: ${overallTotalSales.toFixed(2)}
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-purple-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
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
              {filteredProducts.map((product, index) => (
                <tr key={product._id} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                  <td className="py-4 px-6">
                    <img src={`http://localhost:5000/${product.image}` || 'https://via.placeholder.com/100'} alt={product.name} className="w-16 h-16 object-cover rounded-md shadow" />
                  </td>
                  <td className="py-4 px-6 font-medium text-purple-900">{product.name}</td>
                  <td className="py-4 px-6 text-gray-600">{product.description}</td>
                  <td className="py-4 px-6 text-gray-600">{product.category}</td>
                  <td className="py-4 px-6 text-purple-900">{product.quantity}</td>
                  <td className="py-4 px-6 text-purple-900">${product.purchasePrice}</td>
                  <td className="py-4 px-6 text-purple-900">${product.sellingPrice}</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">${product.totalSales.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link to={`/products/edit/${product._id}`}>
                        <button className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500 transition duration-300">Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Delete</button>
                      <button onClick={() => handleSellClick(product)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Sell</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-2xl font-bold mb-4 text-purple-800">Sell Product</h3>
            <p className="mb-4 text-gray-700">Product: <span className="font-semibold">{selectedProduct.name}</span></p>
            <p className="mb-4 text-gray-700">Available Quantity: <span className="font-semibold">{selectedProduct.quantity}</span></p>
            <input
              type="number"
              value={quantityToSell}
              onChange={(e) => setQuantityToSell(Math.max(1, parseInt(e.target.value)))}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1"
              max={selectedProduct.quantity}
            />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowSellModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300">Cancel</button>
              <button onClick={handleSellConfirm} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 transition duration-300">Confirm Sale</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;