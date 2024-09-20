// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Use effect to sync localStorage with context state (if needed)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      // Simulate login from token
      // Ideally, you would also verify the token with an API
      localStorage.setItem('token', token);
    }
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-black">
              Inventory Management
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-black hover:text-blue-500">Home</Link>
            <Link to="/about" className="text-black hover:text-blue-500">About</Link>
            <Link to="/contact" className="text-black hover:text-blue-500">Contact</Link>

            {/* Conditionally render Login/SignUp or Logout */}
            {isAuthenticated ? (
              <button onClick={() => { logout(); navigate('/login'); }} className="text-black hover:text-red-500">Logout</button>
            ) : (
              <>
                <Link to="/signup" className="text-black hover:text-blue-500">Sign Up</Link>
                <Link to="/login" className="text-black hover:text-blue-500">Login</Link>
              </>
            )}
          </div>

          {/* Hamburger Icon for mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} type="button" className="text-black hover:text-blue-500 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-black hover:text-blue-500">Home</Link>
            <Link to="/about" className="block text-black hover:text-blue-500">About</Link>
            <Link to="/contact" className="block text-black hover:text-blue-500">Contact</Link>

            {/* Conditionally render Login/SignUp or Logout */}
            {isAuthenticated ? (
              <button onClick={() => { logout(); navigate('/login'); }} className="block text-black hover:text-red-500">Logout</button>
            ) : (
              <>
                <Link to="/signup" className="block text-black hover:text-blue-500">Sign Up</Link>
                <Link to="/login" className="block text-black hover:text-blue-500">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
