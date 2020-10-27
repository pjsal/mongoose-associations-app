const router = require('express').Router();
// Link to album model
const Ingredient = require('../models/ingredient.js');

// ROUTES
// NEW - form where new entries are made
router.get("/new", (req, res) => {
    res.render("ingredients/new.ejs")
});

// POST (create) - no page; just an action which will add a new entry
// Use async/await promises
router.post('/', async (req, res) => {
    try {
      let newIngredient = await Ingredient.create(req.body);
      res.send(newIngredient);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;