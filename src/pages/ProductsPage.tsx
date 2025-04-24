import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, getProductsByCategory, searchProducts } from '../data/products';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Update filters when URL parameters change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Apply filters
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      result = searchProducts(searchQuery);
      
      // Further filter by category if needed
      if (selectedCategory !== 'all') {
        result = result.filter(product => product.category === selectedCategory);
      }
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'beans', label: 'Coffee Beans' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'ready-to-drink', label: 'Ready to Drink' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-primary-50 py-10 md:py-16">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-serif text-primary-800 mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of premium coffees, brewing equipment, and more.
            Each product is carefully selected to provide you with the best coffee experience.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <Filter className="text-gray-500 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
              <p className="text-gray-500 text-lg">No products found. Try a different search or filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;