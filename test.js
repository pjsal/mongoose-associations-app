// Line 1: We call a method to find only one Food document that matches the name: Quiche.

// Line 2: We ask the ingredients array within that Food document to fetch the actual Ingredient document instead of just its ObjectId.

// Line 3: When we use find without a callback, then populate, like here, we can put a callback inside an .exec() method call. Technically we have made a query with find, but only executed it when we call .exec().

// Lines 4-15: If we have any errors, we will log them. Otherwise, we can display the entire Food document including the populated ingredients array.

// Line 9 demonstrates that we are able to access both data from the original Food document we found and the referenced Ingredient document we summoned.
const mongoose = require('mongoose');

const Food = require('./models/food');
const Ingredient = require('./models/ingredient');

const mongoURI = 'mongodb://localhost:27017/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

Food.findOne({ name: 'Quiche' })
  .populate('ingredients') // <- magic that pulls in ingredient data
  .exec((err, food) => {
    console.log(food);
    if (err) {
      return console.log(err);
    }
    if (food.ingredients.length > 0) {
      console.log(`I love ${food.name} for the ${food.ingredients[0].name}`);
    } else {
      console.log(`${food.name} has no ingredients.`);
    }
    console.log(`what was that food? ${food}`);
  });