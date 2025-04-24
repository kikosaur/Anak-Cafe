import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, User, Clock, LogOut, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrdersWithItemsByUser } from '../data/orders';

// Mock data for user orders
const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
    getOrdersWithItemsByUser(user.id?.toString?.() ?? user.id)
      .then(data => setOrders(data))
      .finally(() => setLoadingOrders(false));
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
    if (location.state?.orderSuccess) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [user, navigate, location]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="bg-primary-50 py-10 md:py-16">
      <div className="container-custom">
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div 
              className="mb-6 bg-success-100 border border-success-200 text-success-800 px-4 py-3 rounded-md flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Your order was placed successfully! Thank you for your purchase.</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            className="md:w-64 bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center py-3 px-4 rounded-md transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>My Orders</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center py-3 px-4 rounded-md transition-colors ${
                  activeTab === 'account'
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Account Details</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center py-3 px-4 rounded-md transition-colors ${
                  activeTab === 'history'
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Clock className="h-5 w-5 mr-3" />
                <span>Order History</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center py-3 px-4 rounded-md transition-colors text-gray-600 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="flex-1 bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">My Orders</h2>
                {loadingOrders ? (
                  <div>Loading orders...</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <div>
                            <h3 className="font-bold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500">
                              Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-primary-700">
                              ₱{order.total?.toFixed(2)}
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              order.status === 'delivered'
                                ? 'bg-success-100 text-success-800'
                                : order.status === 'pending'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-info-100 text-info-800'
                            }`}>
                              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items?.map?.((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity} x {item.name} {item.size ? `(${item.size})` : ''}
                                </span>
                                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Account Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      value={user.name}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="input w-full" 
                      value={user.email}
                      readOnly
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address
                    </label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      placeholder="Enter your shipping address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      placeholder="Enter your city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="input w-full" 
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Order History</h2>
                
                {orders.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium">{order.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-success-100 text-success-800'
                                : order.status === 'pending'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-info-100 text-info-800'
                            }`}>
                              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            ₱{order.total?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      You haven't placed any orders yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;