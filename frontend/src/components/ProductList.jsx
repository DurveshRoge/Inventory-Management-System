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
    <div className="main-content"> {/* Add the main-content class here */}
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/products/edit/${product._id}`}>
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
