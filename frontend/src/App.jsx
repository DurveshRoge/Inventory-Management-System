import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import ProtectedRoute from './components/ProtectedPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/Homepage';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import ProductList from './components/ProductList';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16"> {/* Added pt-16 for top padding to account for fixed navbar */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected routes for logged-in users */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/products/add" element={<ProtectedRoute><AddProductForm /></ProtectedRoute>} />
              <Route path="/products/edit/:id" element={<ProtectedRoute><EditProductForm /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;