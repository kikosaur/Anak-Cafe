import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary-50 px-4">
      <div className="text-center max-w-md">
        <Coffee className="h-16 w-16 text-primary-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-serif text-primary-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its 
          name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;