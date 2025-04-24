import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Coffee className="h-8 w-8 text-primary-200" />
              <span className="ml-2 text-2xl font-serif font-bold text-white">
                Anak Cafe
              </span>
            </Link>
            <p className="mt-4 text-primary-100">
              Bringing you exceptional coffee experiences since 2020.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-100 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-primary-100 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=beans" className="text-primary-100 hover:text-white transition-colors">
                  Coffee Beans
                </Link>
              </li>
              <li>
                <Link to="/products?category=equipment" className="text-primary-100 hover:text-white transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/products?category=ready-to-drink" className="text-primary-100 hover:text-white transition-colors">
                  Ready to Drink
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-primary-100 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-primary-100 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <address className="not-italic text-primary-100">
              <p>123 Coffee Street</p>
              <p>Manila, Philippines</p>
              <p className="mt-2">
                <a href="tel:+639123456789" className="hover:text-white transition-colors">
                  +63 912 345 6789
                </a>
              </p>
              <p>
                <a href="mailto:hello@anakcafe.com" className="hover:text-white transition-colors">
                  hello@anakcafe.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-700 text-center text-primary-200">
          <p>&copy; {currentYear} Anak Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;