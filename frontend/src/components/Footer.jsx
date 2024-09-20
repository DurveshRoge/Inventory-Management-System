// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-bold text-lg">Inventory Management</h5>
            <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
            <a href="mailto:support@example.com" className="hover:underline">
              support@example.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
