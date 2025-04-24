import React from 'react';
import { useForm } from 'react-hook-form';
import { Map, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    // In a real app, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    reset();
  };
  
  return (
    <div className="bg-primary-50 py-10 md:py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold font-serif text-primary-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We'd love to hear from you. Whether you have a question about our products, 
            orders, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold font-serif text-primary-800 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input w-full ${errors.name ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`input w-full ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
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
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`input w-full ${errors.subject ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error-600">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`input w-full ${errors.message ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    {...register('message', { required: 'Message is required' })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-error-600">{errors.message.message}</p>
                  )}
                </div>
                
                <button type="submit" className="btn btn-primary w-full py-3">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Information and Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold font-serif text-primary-800 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      123 Coffee Street<br />
                      Manila, Philippines
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+639123456789" className="hover:text-primary-600">
                        +63 912 345 6789
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:hello@anakcafe.com" className="hover:text-primary-600">
                        hello@anakcafe.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold font-serif text-primary-800 mb-6">
                Visit Our Store
              </h2>
              
              <div className="bg-gray-200 rounded-lg overflow-hidden h-72 relative">
                <Map className="absolute inset-0 m-auto h-16 w-16 text-gray-400" />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
                  <p className="text-gray-500 px-4 text-center">
                    Map loading... <br />
                    <span className="text-sm">(In a real app, this would be an embedded Google Map)</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium">Store Hours:</h3>
                <p className="text-gray-600 mt-1">
                  Monday - Friday: 7:00 AM - 7:00 PM<br />
                  Saturday - Sunday: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;