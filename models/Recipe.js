const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: function(arr) {
          return arr && arr.length > 0;
        },
        message: 'Ingredients array must not be empty',
      },
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be a positive number'],
    },
    servings: {
      type: Number,
      required: [true, 'Servings are required'],
      min: [1, 'Servings must be a positive number'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
