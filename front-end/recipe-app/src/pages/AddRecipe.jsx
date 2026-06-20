import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecipes } from '../hooks/useRecipes';
import recipeService from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (recipeData) => {
    setIsSubmitting(true);
    try {
      const newRecipe = await recipeService.createRecipe(recipeData);
      addRecipe(newRecipe);
      toast.success('Recipe created successfully!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create recipe';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm border border-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-primary-600" />
            Create New Recipe
          </h1>
          <p className="text-slate-500 text-sm mt-1">Fill in the details to add a new recipe to your collection.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <RecipeForm 
          onSubmit={handleSubmit} 
          onCancel={() => navigate(-1)}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddRecipe;
