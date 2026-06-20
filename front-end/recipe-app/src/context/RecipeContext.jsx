import React, { createContext, useState, useCallback } from 'react';
import recipeService from '../services/recipeService';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all recipes
  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recipes');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new recipe to state
  const addRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  // Update existing recipe in state
  const updateRecipe = (id, updatedRecipe) => {
    setRecipes((prev) => 
      prev.map(recipe => recipe._id === id || recipe.id === id ? updatedRecipe : recipe)
    );
  };

  // Remove recipe from state
  const removeRecipe = (id) => {
    setRecipes((prev) => prev.filter(recipe => recipe._id !== id && recipe.id !== id));
  };

  return (
    <RecipeContext.Provider 
      value={{ 
        recipes, 
        loading, 
        error, 
        fetchRecipes, 
        addRecipe, 
        updateRecipe, 
        removeRecipe 
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
