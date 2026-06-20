import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path) => 
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      location.pathname === path
        ? 'bg-primary-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600'
    }`;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <ChefHat size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
              Recipes CRUD
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className={navLinkClass('/')}>
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            <Link to="/add" className={navLinkClass('/add')}>
              <PlusCircle size={18} />
              <span className="hidden sm:inline font-medium">Add Recipe</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
