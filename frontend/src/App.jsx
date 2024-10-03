import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Wrap the app with AuthProvider
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import ProtectedRoute from './components/ProtectedPage'; // Protect routes that require authentication
import Dashboard from './components/Dashboard';
import HomePage from './components/Homepage'; // General homepage for non-logged-in users
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <AuthProvider> {/* Wrap everything inside AuthProvider to provide auth state throughout the app */}
      <Router>
        <div className="app-container">
          <Navbar /> {/* Include the Navbar component */}
          <main className="content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} /> {/* General homepage for non-logged-in users */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes for logged-in users */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/products/add" element={<ProtectedRoute><AddProductForm /></ProtectedRoute>} />
              <Route path="/products/edit/:id" element={<ProtectedRoute><EditProductForm /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer className="footer" /> {/* Include Footer component */}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
