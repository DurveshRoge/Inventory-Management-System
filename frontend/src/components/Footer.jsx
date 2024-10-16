// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-3 sm:mb-0 text-center sm:text-left">
            <h5 className="font-bold text-lg">
              <span className="text-yellow-400">Inventory</span> Management
            </h5>
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
            <Link to="/privacy-policy" className="hover:text-yellow-300 transition duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-yellow-300 transition duration-300 text-sm">
              Terms of Service
            </Link>
            <a href="mailto:support@example.com" className="hover:text-yellow-300 transition duration-300 text-sm">
              support@example.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
