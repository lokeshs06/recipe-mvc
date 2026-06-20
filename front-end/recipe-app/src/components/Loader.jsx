import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-8 w-full";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
