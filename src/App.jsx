

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


function App() {
  
  
  
  return (
    <Router>
      <Navbar />
      <Routes>
        {}
        <Route path="/" element={<Home />} />
        {}
        <Route path="/features" element={<Features />} />
        {}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        {}
        <Route path="/cart" element={<Cart />} />
        {}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {}
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        {}
        <Route path="/carts" element={<Carts />} />
        <Route path="/carts/:cartId" element={<CartDetail />} />
      </Routes>
    </Router>
  );
}

export default App;




