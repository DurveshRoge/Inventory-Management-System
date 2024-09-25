import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="main-content p-6"> {/* Add padding for better spacing */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Product List</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">
              Quantity
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="py-4 px-6 border-b border-gray-200">
                {/* Show the product image */}
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="py-4 px-6 border-b border-gray-200">{product.name}</td>
              <td className="py-4 px-6 border-b border-gray-200">{product.quantity}</td>
              <td className="py-4 px-6 border-b border-gray-200">${product.price}</td>
              <td className="py-4 px-6 border-b border-gray-200">
                <div className="flex space-x-4">
                  <Link to={`/products/edit/${product._id}`}>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Edit
                    </button>
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
    </div>
  );
};

export default ProductList;
