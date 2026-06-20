import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecipes } from '../hooks/useRecipes';
import recipeService from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';
import Loader from '../components/Loader';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateRecipe } = useRecipes();
  
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        toast.error('Failed to load recipe details');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleSubmit = async (recipeData) => {
    setIsSubmitting(true);
    try {
      const updatedData = await recipeService.updateRecipe(id, recipeData);
      updateRecipe(id, updatedData);
      toast.success('Recipe updated successfully!');
      navigate(`/recipe/${id}`);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update recipe';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl shadow-sm border border-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Edit className="text-blue-600" />
            Edit Recipe
          </h1>
          <p className="text-slate-500 text-sm mt-1">Update the details of your recipe.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <RecipeForm 
          initialData={recipe}
          onSubmit={handleSubmit} 
          onCancel={() => navigate(-1)}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditRecipe;
