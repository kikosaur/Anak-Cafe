import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll event for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Coffee className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-2xl font-serif font-bold text-primary-800">
              Anak Cafe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${
                location.pathname === '/products' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${
                location.pathname === '/about' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${
                location.pathname === '/contact' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="flex items-center text-gray-700 hover:text-primary-600"
              >
                <User className="h-5 w-5 mr-1" />
                <span>{user?.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600"
              >
                Login
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-primary-600" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-4">
              <Link 
                to="/" 
                className={`block py-2 font-medium ${
                  location.pathname === '/' 
                    ? 'text-primary-600' 
                    : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`block py-2 font-medium ${
                  location.pathname === '/products' 
                    ? 'text-primary-600' 
                    : 'text-gray-700'
                }`}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`block py-2 font-medium ${
                  location.pathname === '/about' 
                    ? 'text-primary-600' 
                    : 'text-gray-700'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block py-2 font-medium ${
                  location.pathname === '/contact' 
                    ? 'text-primary-600' 
                    : 'text-gray-700'
                }`}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-gray-100">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="block py-2 font-medium text-gray-700"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="block py-2 font-medium text-gray-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;