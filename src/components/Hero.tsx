import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-primary-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/6802991/pexels-photo-6802991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Coffee background" 
          className="w-full h-full object-cover object-center opacity-40"
        />
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Experience Coffee <br />
            <span className="text-primary-300">Like Never Before</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg text-primary-100 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            At Anak Cafe, we're dedicated to bringing you exceptional coffee sourced 
            directly from sustainable farms around the world, roasted to perfection 
            and delivered fresh to your door.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/about" className="btn border border-white text-white hover:bg-white/10">
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;