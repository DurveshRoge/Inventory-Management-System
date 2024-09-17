import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import ProtectedRoute from './components/ProtectedPage';
import Dashboard from './components/Dashboard';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route for Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* Protected routes for product management */}
        <Route path="/products/add" element={<ProtectedRoute><AddProductForm /></ProtectedRoute>} />
        <Route path="/products/edit/:id" element={<ProtectedRoute><EditProductForm /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
