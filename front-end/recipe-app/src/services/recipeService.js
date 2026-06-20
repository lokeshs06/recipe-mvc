import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeService = {
  // Get all recipes
  getAllRecipes: async () => {
    const response = await api.get('/recipes');
    return response.data.data;
  },

  // Get single recipe by ID
  getRecipeById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data.data;
  },

  // Create new recipe
  createRecipe: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data.data;
  },

  // Update existing recipe
  updateRecipe: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data.data;
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data.data;
  }
};

export default recipeService;
