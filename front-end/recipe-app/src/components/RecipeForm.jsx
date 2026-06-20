import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const RecipeForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    cookingTime: '',
    servings: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        // Ensure ingredients is an array
        ingredients: Array.isArray(initialData.ingredients) 
          ? (initialData.ingredients.length > 0 ? initialData.ingredients : ['']) 
          : [''],
        instructions: initialData.instructions || '',
        cookingTime: initialData.cookingTime || '',
        servings: initialData.servings || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) return;
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.instructions.trim()) return 'Instructions are required';
    if (!formData.cookingTime || formData.cookingTime <= 0) return 'Valid cooking time is required';
    if (!formData.servings || formData.servings <= 0) return 'Valid servings number is required';
    
    const validIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
    if (validIngredients.length === 0) return 'At least one ingredient is required';

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    // Clean up empty ingredients before submitting
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== '')
    };

    onSubmit(cleanedData);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-slate-700";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>Recipe Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
          placeholder="e.g. Classic Margherita Pizza"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            min="1"
            className={inputClasses}
            placeholder="e.g. 45"
          />
        </div>
        <div>
          <label className={labelClasses}>Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            min="1"
            className={inputClasses}
            placeholder="e.g. 4"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-1.5">
          <label className={labelClasses} style={{ marginBottom: 0 }}>Ingredients</label>
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-3">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className={inputClasses}
                placeholder={`Ingredient ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                disabled={formData.ingredients.length === 1}
                className="p-2.5 text-slate-400 hover:text-red-500 disabled:opacity-50 transition-colors bg-slate-50 border border-slate-200 rounded-xl"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows="5"
          className={`${inputClasses} resize-none`}
          placeholder="Step-by-step instructions..."
        ></textarea>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
        >
          <X size={18} /> Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isLoading ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
