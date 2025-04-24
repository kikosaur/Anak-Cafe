import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import { Coffee, Truck, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Coffee className="h-8 w-8 text-primary-600" />,
                title: "Premium Quality",
                description: "We source only the finest beans from sustainable farms worldwide."
              },
              {
                icon: <Truck className="h-8 w-8 text-primary-600" />,
                title: "Fast Delivery",
                description: "Free shipping on orders over $30, delivered fresh to your door."
              },
              {
                icon: <Heart className="h-8 w-8 text-primary-600" />,
                title: "Ethically Sourced",
                description: "Supporting fair trade practices and sustainable farming."
              },
              {
                icon: <Clock className="h-8 w-8 text-primary-600" />,
                title: "Freshly Roasted",
                description: "Beans roasted to order, ensuring peak flavor and aroma."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      {/* About Section Preview */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-serif mb-6">Our Coffee Journey</h2>
              <p className="text-primary-100 mb-4">
                At Anak Cafe, we believe that great coffee is an art form, a science, and a passion. 
                Our journey began in the highlands of the Philippines, where we discovered the incredible 
                potential of locally grown beans.
              </p>
              <p className="text-primary-100 mb-6">
                Today, we continue to explore the world of coffee, bringing you exceptional beans from 
                sustainable farms across the globe, roasted to perfection to highlight their unique characteristics.
              </p>
              <a href="/about" className="btn bg-white text-primary-800 hover:bg-primary-100">
                Learn More
              </a>
            </motion.div>
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coffee farmer" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold font-serif text-primary-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Coffee Club
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to our newsletter for special offers, brewing tips, and early access to new products.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input flex-1"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;