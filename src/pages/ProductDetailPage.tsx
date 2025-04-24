import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Missing product ID.');
      setLoading(false);
      return;
    }
    setLoading(true);
    getProductById(id)
      .then(data => {
        if (!data) {
          setError('Product not found.');
        } else {
          // Patch fields for compatibility with Product type
          setProduct({
            ...data,
            image: data.image_url || '',
            image_url: data.image_url ?? undefined,
            inStock: typeof data.in_stock === 'boolean' ? data.in_stock : true,
            description: data.description || '',
          });
        }
      })
      .catch(() => setError('Failed to fetch product.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">{error || "Sorry, we couldn't find the product you're looking for."}</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, 'small'); // Default to small size
    // Show success notification or feedback
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, 'small');
    navigate('/checkout');
  };

  return (
    <div className="bg-white py-10">
      <div className="container-custom">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-primary-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <motion.div 
            className="rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm uppercase tracking-wide text-primary-600 mb-1">
              {product.category.replace('-', ' ')}
            </div>
            <h1 className="text-3xl font-bold font-serif mb-4">{product.name}</h1>
            <div className="text-2xl font-bold text-primary-700 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:border-primary-500 focus:outline-none"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:border-primary-500 focus:outline-none"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="btn btn-outline flex-1 py-3"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="btn btn-primary flex-1 py-3"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;