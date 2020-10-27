const mongoose = require('mongoose');

const Food = require('./models/food');
const Ingredient = require('./models/ingredient');

const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

// The next steps are doing several things, 1) creating a new instance of ingredients and food, tieing them together via Mongo reference, and then saving to the DB.  This is better than creating individual foods/ingredients, saving them to the DB, then retrieving them from the db onlt to tie them together.

// Async is a "promise".  We don't want it frozen when this is processing.  This needs to be wrapped in a function.
async function seed() {
  // CREATE TWO INGREDIENTS
  // The "await" reserve word is another promise.  We need to wait for the task to complete before moving forward
  const cheddar = await Ingredient.create({
    name: 'cheddar cheese',
    origin: 'Wisconson',
  });

  const dough = await Ingredient.create({
    name: 'dough',
    origin: 'Iowa',
  });

  // CREATE A NEW FOOD.  We are not using the Mongoose create statement because we need to do additional actions before persisting (i.e., adding the ingredients before saving to the DB further below).
  const cheesyQuiche = new Food({
    name: 'Quiche',
    ingredients: [],
  });

  // // PUSH THE INGREDIENTS ONTO THE FOOD'S
  // // INGREDIENTS ARRAY
  cheesyQuiche.ingredients.push(dough);
  cheesyQuiche.ingredients.push(cheddar); // associated!
  cheesyQuiche.save(function (err, savedCheesyQuiche) {
    if (err) {
      console.log(err);
    } else {
      console.log('cheesyQuiche food is ', savedCheesyQuiche);
    }
  });
}

seed();