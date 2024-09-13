import React, { useState } from 'react';

const Navbar = () => {
  // State to manage the mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    window.location.href = '/login';   // Redirect to login page after logout
  };

  // Check if the user is logged in by looking for a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-black">
              Inventory Management
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-black hover:text-blue-500">Home</a>
            <a href="/about" className="text-black hover:text-blue-500">About</a>
            <a href="/contact" className="text-black hover:text-blue-500">Contact</a>

            {/* Conditionally render Login/SignUp or Logout */}
            {isLoggedIn ? (
              <button onClick={logout} className="text-black hover:text-red-500">Logout</button>
            ) : (
              <>
                <a href="/signup" className="text-black hover:text-blue-500">Sign Up</a>
                <a href="/login" className="text-black hover:text-blue-500">Login</a>
              </>
            )}
          </div>
          {/* Hamburger Icon */}
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
            <a href="/" className="block text-black hover:text-blue-500">Home</a>
            <a href="/about" className="block text-black hover:text-blue-500">About</a>
            <a href="/contact" className="block text-black hover:text-blue-500">Contact</a>

            {/* Conditionally render Login/SignUp or Logout */}
            {isLoggedIn ? (
              <button onClick={logout} className="block text-black hover:text-red-500">Logout</button>
            ) : (
              <>
                <a href="/signup" className="block text-black hover:text-blue-500">Sign Up</a>
                <a href="/login" className="block text-black hover:text-blue-500">Login</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
