import React, { useEffect, useState, useMemo } from 'react';
import { Search, ChefHat } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecipes } from '../hooks/useRecipes';
import recipeService from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';

const Home = () => {
  const { recipes, loading, error, fetchRecipes, removeRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchRecipes().catch(err => {
      toast.error('Failed to load recipes. Please try again later.');
    });
  }, [fetchRecipes]);

  // Filter recipes based on search
  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipes;
    const term = searchTerm.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term)
    );
  }, [recipes, searchTerm]);

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;
    
    setIsDeleting(true);
    const id = recipeToDelete._id || recipeToDelete.id;
    
    try {
      await recipeService.deleteRecipe(id);
      removeRecipe(id);
      toast.success('Recipe deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete recipe';
      toast.error(message);
    } finally {
      setIsDeleting(false);
      setRecipeToDelete(null);
    }
  };

  if (loading && recipes.length === 0) {
    return <Loader fullScreen />;
  }

  if (error && recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ChefHat size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-slate-500 max-w-md">{error}</p>
        <button 
          onClick={() => fetchRecipes()}
          className="mt-6 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Recipes</h1>
          <p className="text-slate-500 text-sm mt-1">Discover and manage your culinary creations</p>
        </div>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm"
            placeholder="Search recipes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe._id || recipe.id} 
              recipe={recipe} 
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No recipes found</h3>
          <p className="text-slate-500">
            {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any recipes yet."}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Recipe"
        message={`Are you sure you want to delete "${recipeToDelete?.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Home;
