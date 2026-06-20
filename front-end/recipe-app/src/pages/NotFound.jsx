import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-3">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-semibold shadow-sm hover-card-up"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
