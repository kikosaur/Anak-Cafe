import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, 'small'); // default to small size
  };

  return (
    <motion.div 
      className="card hover-lift"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-60 object-cover"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs uppercase font-bold tracking-wider py-1 px-2 rounded">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <span className="font-bold text-primary-700">{formatCurrency(product.price)}</span>
          </div>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 capitalize">{product.category.replace('-', ' ')}</span>
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;