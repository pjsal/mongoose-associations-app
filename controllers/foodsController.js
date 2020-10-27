const router = require('express').Router();
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');


// ROUTES
// INDEX
router.get('/', async (req, res) => {
  // Query
  let allFoods = await Food.find({});
  res.render('foods/index.ejs', {
    foods: allFoods
  });
})

// NEW - form where new entries are made.  If one or both async/await is omitted, you may get an error on the new page saying that the ingredients variable is not defined.
router.get('/new', async (req, res) => {
  // Get all ingredients from the DB
  let allIngredients = await Ingredient.find({})
  // Render page and pass ingredients
  res.render('foods/new.ejs', { ingredients: allIngredients});
});

// POST (create) - no page; just an action which will add a new entry
// Use async/await promises
router.post('/', async (req, res) => {
  console.log(req.body);
  let food = await Food.create(req.body);
  res.redirect(`/foods/${food.id}`);
});

// SHOW
router.get('/:id', async (req, res) => {
  // Need the populate function along with ingredients parm so we have all the details, not just the ingredient id'.
  let allIngredients = await Ingredient.find({});
  let foundFood = await Food.findById(req.params.id).populate({
    path: 'ingredients',
    options: { sort: { ['name']: 1 } },
  });
  res.render('foods/show.ejs', {
    food: foundFood,
    ingredients: allIngredients,
  });
});

router.put('/:foodId/ingredients', async (req, res) => {
  let foundFood = await Food.findByIdAndUpdate(
    req.params.foodId,
    {
      $push: {
        ingredients: req.body.ingredients,
      },
    },
    { new: true, upsert: true }
  );
  console.log(foundFood);
  res.redirect(`/foods/${foundFood.id}`);
});



module.exports = router;