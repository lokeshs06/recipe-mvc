import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Edit2, Trash2, Eye } from 'lucide-react';

const RecipeCard = ({ recipe, onDeleteClick }) => {
  // Use _id for MongoDB typical responses, fallback to id
  const recipeId = recipe._id || recipe.id;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover-card-up flex flex-col h-full group">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-primary-400 to-primary-600 w-full"></div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-primary-500" />
            <span>{recipe.cookingTime} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-primary-500" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link 
            to={`/recipe/${recipeId}`}
            className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors text-sm font-medium"
          >
            <Eye size={16} />
            View
          </Link>
          <Link 
            to={`/edit/${recipeId}`}
            className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium"
          >
            <Edit2 size={16} />
            Edit
          </Link>
          <button 
            onClick={() => onDeleteClick(recipe)}
            className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors text-sm font-medium"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
