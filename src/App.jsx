/**
 * Main Application Component (App.jsx)
 * 
 * Core routing and layout structure for the entire application.
 * Provides:
 * - BrowserRouter for client-side routing
 * - Navbar component for navigation (appears on all pages)
 * - 11 routes for different pages and features
 * 
 * Route Structure:
 * Public Routes:
 * - / (Home) - Landing page with features overview
 * - /features - Detailed feature list
 * - /products - Product browsing and search
 * - /products/:productId - Individual product details
 * 
 * Authentication Routes:
 * - /login - User login page
 * - /dashboard - Post-login dashboard
 * 
 * User & Cart Routes:
 * - /cart - Shopping cart management
 * - /users - List all users
 * - /users/:userId - Individual user details
 * - /carts - Browse all carts
 * - /carts/:cartId - Individual cart details
 */

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import CartDetail from './pages/CartDetail';
import Carts from './pages/Carts';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import UserDetail from './pages/UserDetail';
import Users from './pages/Users';

/**
 * Main App Component
 * Configures routing and layout
 */
function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />

      {/* Route definitions for all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />

        {/* Product Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        {/* Shopping Cart Routes */}
        <Route path="/cart" element={<Cart />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* User Management Routes */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />

        {/* Carts Browsing Routes */}
        <Route path="/carts" element={<Carts />} />
        <Route path="/carts/:cartId" element={<CartDetail />} />
      </Routes>
    </Router>
  );
}

export default App;