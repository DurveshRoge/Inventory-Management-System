import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      localStorage.setItem('token', token);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate(isAuthenticated ? '/dashboard' : '/');
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/login');
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="text-white hover:text-yellow-300 transition duration-300"
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="block text-white hover:bg-indigo-700 hover:text-yellow-300 px-3 py-2 rounded-md transition duration-300"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-800 shadow-lg fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300">
              <span className="text-yellow-400">Inventory</span> Management
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to={isAuthenticated ? "/dashboard" : "/"} onClick={handleHomeClick}>
              {isAuthenticated ? "Dashboard" : "Home"}
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-white hover:text-red-300 transition duration-300">Logout</button>
            ) : (
              <>
                <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">Sign Up</Link>
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">Login</Link>
              </>
            )}
          </div>

          {/* Hamburger Icon for mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} type="button" className="text-white hover:text-yellow-300 focus:outline-none transition duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to={isAuthenticated ? "/dashboard" : "/"} onClick={handleHomeClick}>
              {isAuthenticated ? "Dashboard" : "Home"}
            </MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>

            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left text-white hover:bg-red-600 hover:text-white px-3 py-2 rounded-md transition duration-300">Logout</button>
            ) : (
              <>
                <MobileNavLink to="/signup">Sign Up</MobileNavLink>
                <MobileNavLink to="/login">Login</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;