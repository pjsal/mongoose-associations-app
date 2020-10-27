const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');


// ROUTES
// NEW - form where new entries are made
router.get('/new', async (req, res) => {
  // Get all ingredients from the DB
  let allIngredients = await Ingredient.find({})
  // Render page and pass ingredients
  res.render('foods/new.ejs', { ingredients: allIngredients});
});

// POST (create) - no page; just an action which will add a new entry
// Use async/await promises
router.post('/', async (req, res) => {
  let food = await Food.create(req.body);
  res.redirect(`/foods/${food.id}`);
});



module.exports = router;