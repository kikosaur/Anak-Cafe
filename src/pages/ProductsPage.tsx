import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts, getProductsByCategory, searchProducts } from '../data/products';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        if (mounted) {
          setAllProducts(Array.isArray(data) ? data : []);
          setFilteredProducts(Array.isArray(data) ? data : []);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let result = allProducts;
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, allProducts]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'specialty-drinks', label: 'Specialty Drinks' },
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
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products found.</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map(product => (
              <motion.div key={product.id} variants={itemVariants}>
                <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;