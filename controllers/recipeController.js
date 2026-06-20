const Recipe = require('../models/Recipe');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = async (req, res, next) => {
  try {
    const { title, ingredients, instructions, cookingTime, servings } = req.body;

    // Validate required fields
    if (!title || !ingredients || !instructions || !cookingTime || !servings) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      res.status(400);
      throw new Error('Ingredients must be a non-empty array');
    }

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      servings,
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({});

    res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Public
const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    // Optional validation for updates
    if (req.body.ingredients && (!Array.isArray(req.body.ingredients) || req.body.ingredients.length === 0)) {
      res.status(400);
      throw new Error('Ingredients must be a non-empty array');
    }
    
    if (req.body.cookingTime && req.body.cookingTime < 1) {
      res.status(400);
      throw new Error('Cooking time must be a positive number');
    }

    if (req.body.servings && req.body.servings < 1) {
      res.status(400);
      throw new Error('Servings must be a positive number');
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Public
const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    await recipe.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
