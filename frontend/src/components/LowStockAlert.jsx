import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LowStockAlert = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/low-stock`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLowStockItems(response.data);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
      }
    };

    fetchLowStockItems();
  }, []);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Low Stock Alert!</strong>
      <span className="block sm:inline"> The following items are running low:</span>
      <ul className="mt-2 list-disc list-inside">
        {lowStockItems.map(item => (
          <li key={item._id}>{item.name} (Quantity: {item.quantity})</li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockAlert;