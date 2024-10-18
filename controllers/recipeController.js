const Recipe = require('../models/Recipe');

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new recipe
const createRecipe = async (req, res) => {
  const { name, image, description, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      image,
      description,
      ingredients,
      instructions,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
};
