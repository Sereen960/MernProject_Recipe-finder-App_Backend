const express = require('express');
const { getRecipes, getRecipeById, createRecipe } = require('../controllers/recipeController');
const multer = require('multer');

// Multer setup for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.route('/').get(getRecipes).post(upload.single('image'), createRecipe); // Multer used in POST
router.route('/:id').get(getRecipeById);

module.exports = router;
