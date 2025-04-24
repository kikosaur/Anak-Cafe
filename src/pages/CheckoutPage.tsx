import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Palette as Paypal } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentMethod } from '../types';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

const CheckoutPage: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      firstName: user?.name.split(' ')[0] || '',
      lastName: user?.name.split(' ')[1] || '',
      email: user?.email || '',
      paymentMethod: 'credit_card'
    }
  });
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order submitted:', data);
    
    // In a real app, this would make an API call to process the order
    
    // Simulate successful order
    setTimeout(() => {
      clearCart();
      navigate('/dashboard', { state: { orderSuccess: true } });
    }, 1500);
  };
  
  return (
    <div className="bg-primary-50 py-10 md:py-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold font-serif text-primary-800 mb-10">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`input w-full ${errors.firstName ? 'border-error-500' : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-error-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`input w-full ${errors.lastName ? 'border-error-500' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-error-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`input w-full ${errors.email ? 'border-error-500' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={`input w-full ${errors.address ? 'border-error-500' : ''}`}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-error-600">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={`input w-full ${errors.city ? 'border-error-500' : ''}`}
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-error-600">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      className={`input w-full ${errors.state ? 'border-error-500' : ''}`}
                      {...register('state', { required: 'State is required' })}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-error-600">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip/Postal Code
                    </label>
                    <input
                      id="zip"
                      type="text"
                      className={`input w-full ${errors.zip ? 'border-error-500' : ''}`}
                      {...register('zip', { required: 'Zip code is required' })}
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-error-600">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    className={`select w-full ${errors.country ? 'border-error-500' : ''}`}
                    {...register('country', { required: 'Country is required' })}
                  >
                    <option value="">Select a country</option>
                    <option value="PH">Philippines</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                    <option value="JP">Japan</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-error-600">{errors.country.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`input w-full ${errors.phone ? 'border-error-500' : ''}`}
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="credit_card"
                      type="radio"
                      value="credit_card"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      checked={paymentMethod === 'credit_card'}
                      {...register('paymentMethod')}
                      onChange={() => setPaymentMethod('credit_card')}
                    />
                    <label htmlFor="credit_card" className="ml-3 flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                      <span>Credit Card</span>
                    </label>
                  </div>
                  
                  {paymentMethod === 'credit_card' && (
                    <div className="ml-7 mt-3 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          className="input w-full"
                          {...register('cardNumber', { required: paymentMethod === 'credit_card' })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            id="cardExpiry"
                            type="text"
                            placeholder="MM/YY"
                            className="input w-full"
                            {...register('cardExpiry', { required: paymentMethod === 'credit_card' })}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            id="cardCvc"
                            type="text"
                            placeholder="123"
                            className="input w-full"
                            {...register('cardCvc', { required: paymentMethod === 'credit_card' })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      type="radio"
                      value="paypal"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      checked={paymentMethod === 'paypal'}
                      {...register('paymentMethod')}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <label htmlFor="paypal" className="ml-3 flex items-center">
                      <Paypal className="h-5 w-5 text-gray-500 mr-2" />
                      <span>PayPal</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="gcash"
                      type="radio"
                      value="gcash"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      checked={paymentMethod === 'gcash'}
                      {...register('paymentMethod')}
                      onChange={() => setPaymentMethod('gcash')}
                    />
                    <label htmlFor="gcash" className="ml-3 flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <rect width="24" height="24" rx="4" fill="#0856CD" />
                        <path d="M12 6L7 10H17L12 6Z" fill="white" />
                        <path d="M17 14L12 18L7 14H17Z" fill="white" />
                      </svg>
                      <span>GCash</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full py-3 mb-4">
                Place Order
              </button>
            </form>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-gray-500 ml-1">x{item.quantity}</span>
                    </div>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-primary-700">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              
              {!isAuthenticated && (
                <div className="bg-primary-50 p-4 rounded-md text-sm">
                  <p>
                    <span className="font-medium">Already have an account? </span>
                    <a href="/login" className="text-primary-600 hover:text-primary-700">
                      Log in
                    </a>
                    <span> for a faster checkout experience.</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;