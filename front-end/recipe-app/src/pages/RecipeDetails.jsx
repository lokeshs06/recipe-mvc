import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecipes } from '../hooks/useRecipes';
import recipeService from '../services/recipeService';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeRecipe } = useRecipes();
  
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        toast.error('Recipe not found');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await recipeService.deleteRecipe(id);
      removeRecipe(id);
      toast.success('Recipe deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete recipe');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;
  if (!recipe) return null;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Navigation & Actions Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to Recipes
        </button>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link 
            to={`/edit/${id}`}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors font-medium shadow-sm border border-blue-200"
          >
            <Edit2 size={18} /> Edit
          </Link>
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium shadow-sm border border-red-200"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
        {/* Decorative Header */}
        <div className="h-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 w-full"></div>
        
        <div className="p-8 md:p-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100 mb-8">
            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl font-medium">
              <Clock className="text-primary-500" size={20} />
              <span>{recipe.cookingTime} Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl font-medium">
              <Users className="text-primary-500" size={20} />
              <span>{recipe.servings} Servings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Ingredients */}
            <div className="md:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Ingredients
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700 leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Instructions</h2>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-700 leading-loose whitespace-pre-wrap">
                  {recipe.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default RecipeDetails;
