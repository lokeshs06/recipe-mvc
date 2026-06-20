import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AddRecipe from '../pages/AddRecipe';
import EditRecipe from '../pages/EditRecipe';
import RecipeDetails from '../pages/RecipeDetails';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
